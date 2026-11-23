+++
title = "sjq: simdjson on the command line"
layout = "single-para"
+++

[sjq](https://github.com/simdjson/sjq) is a command-line JSON processor that
reads the [jq language](https://jqlang.org/manual/). The filters you write for
jq work with sjq, and on large inputs they run ten to a hundred times faster.

{{< highlight bash "">}}
sjq '.statuses[] | {id, name: .user.name}' twitter.json
sjq -c 'select(.status == 404) | {ip, url}' access.ndjson
sjq -r '.[] | "\(.id)\t\(.name)"' users.json
{{< / highlight >}}

### Install

Linux and macOS:

{{< highlight bash "">}}
curl -fsSL https://raw.githubusercontent.com/simdjson/sjq/main/install.sh | sh
{{< / highlight >}}

Windows (PowerShell):

{{< highlight powershell "">}}
irm https://raw.githubusercontent.com/simdjson/sjq/main/install.ps1 | iex
{{< / highlight >}}

The scripts download the binary for your system from the
[latest release](https://github.com/simdjson/sjq/releases) and check its
SHA-256 checksum. The Linux binaries are static (x86-64 and ARM64), the macOS
binary runs on Apple silicon and Intel Macs, and Windows has x64 and ARM64
builds. One binary is enough for each system: simdjson detects the processor
when sjq starts and picks the fastest code it supports.

### Performance

We compared sjq with jq 1.8.2 on two inputs built from simdjson's
`twitter.json` sample: 1 GB of newline-delimited JSON (one tweet per line) and
one 840 MB document. The outputs of jq and sjq are identical. "sjq" is the
default, which filters large newline-delimited files on all cores;
"sjq --threads 1" uses one core.

![Wall time of jq and sjq on 1 GB of NDJSON](/sjq/bench-ndjson-light.svg)

![Wall time of jq and sjq on one 840 MB document](/sjq/bench-document-light.svg)

| Input | Workload | jq 1.8.2 | sjq, one thread | sjq |
|---|---|---:|---:|---:|
| 1 GB NDJSON | minify (`-c .`) | 22.3 s | 1.24 s | 0.16 s |
| 1 GB NDJSON | pretty-print (`.`) | 24.5 s | 1.49 s | 0.18 s |
| 1 GB NDJSON | extract a field | 11.5 s | 0.28 s | 0.09 s |
| 1 GB NDJSON | select and build objects | 11.5 s | 0.28 s | 0.09 s |
| 1 GB NDJSON | string interpolation | 11.7 s | 0.35 s | 0.10 s |
| 1 GB NDJSON | regular expression | 25.2 s | 0.61 s | 0.61 s |
| 840 MB document | count elements | 11.7 s | 0.66 s | 0.66 s |
| 840 MB document | minify (`-c .`) | 16.5 s | 1.33 s | 1.33 s |
| 840 MB document | `group_by` | 12.1 s | 0.97 s | 0.95 s |

Mean wall time on a dual Intel Xeon Gold 6548N server (Linux, GCC 16), with
jq's official static binary and hyperfine. The single-document runs of all
three tools are pinned to the same socket.

### How

sjq parses JSON with simdjson. When a filter only navigates and selects, sjq
runs it with simdjson's On-Demand API, which parses only what the filter reads
and copies the output from the input. Files are mapped in memory instead of
being copied, and large newline-delimited files are filtered on all cores,
with the results written in order.

### FracturedJson output

sjq can also write JSON in the [FracturedJson](https://github.com/j-brooke/FracturedJson)
layout, with simdjson's formatter: short arrays and objects stay on one line,
and arrays of similar records become aligned tables.

{{< highlight bash "">}}
$ sjq --fractured '.statuses[:4] | map({id, lang, rt: .retweet_count, user: .user.screen_name})' twitter.json
[
  {"id": 505874924095815681, "lang": "ja", "rt": 0 , "user": "ayuu0123"   },
  {"id": 505874922023837696, "lang": "ja", "rt": 82, "user": "yuttari1998"},
  {"id": 505874920140591104, "lang": "ja", "rt": 0 , "user": "ttm_protect"},
  {"id": 505874919020699648, "lang": "ja", "rt": 58, "user": "chibu4267"  }
]
{{< / highlight >}}

### Compatibility

sjq implements the jq 1.8 language: paths, `select`, `map`, `reduce`,
`foreach`, function definitions, string interpolation and formats such as
`@csv`, assignment (`=`, `|=`, `+=`), `del`, destructuring, regular
expressions, dates, `input` and `inputs`, and the usual options (`-r`, `-c`,
`-s`, `-n`, `-R`, `--arg`, `--argjson`, ...). 728 of the 781 tests of jq's own
test suite pass, and the [jq tutorial](https://jqlang.org/tutorial/) runs
unchanged. The [documentation](https://simdjson.github.io/sjq/) lists the
differences.
