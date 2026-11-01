+++
title = "Software"
layout = "single-para"
+++

 The library is part of major linux distributions like [Ubuntu](https://packages.ubuntu.com/source/jammy/simdjson), [Debian](https://packages.debian.org/unstable/source/simdjson), Arch Linux, Fedora, Alpine and as a FreeBSD package. It is in [Microsoft vcpkg](https://github.com/simdjson/simdjson/wiki/vcpkg). It is available as an [MSYS2 package](https://github.com/simdjson/simdjson/wiki/MSYS2), from [brew](https://formulae.brew.sh/formula/simdjson) and from conan. We publish it as single-header library as well as a CMake build from the [GitHub repository](https://github.com/simdjson/simdjson).
We have a [simdjson organization on GitHub](https://github.com/simdjson).


### Quick Start

Prerequisites: a recent C++ compiler.



1.  Pull `simdjson.h` and `simdjson.cpp` from our singleheader directory into a directory of your choice, along with the sample file twitter.json from our jsonexamples repository.

{{< highlight bash "">}}
SIMDJSON_BASE="https://raw.githubusercontent.com/simdjson/simdjson/master/"

wget "${SIMDJSON_BASE}singleheader/simdjson.h" \
     "${SIMDJSON_BASE}singleheader/simdjson.cpp" \
     "${SIMDJSON_BASE}jsonexamples/twitter.json"
{{< / highlight >}}

2. Create `quickstart.cpp`:

{{< highlight cpp "">}}
   #include "simdjson.h"
   using namespace simdjson;
   int main(void) {
      ondemand::parser parser;
      padded_string json = padded_string::load("twitter.json");
      ondemand::document tweets = parser.iterate(json);
      std::cout << uint64_t(tweets["search_metadata"]["count"]) 
        << " results." << std::endl;
   }
{{< / highlight >}}

3. Compile:
{{< highlight bash "">}}
   c++ -o quickstart quickstart.cpp simdjson.cpp -std=c++17
{{< / highlight >}}

4. Run:
{{< highlight bash "">}}
   ./quickstart
{{< / highlight >}}


### Quick Start in Python

Prerequisites: Python 3.10 or newer. Our official Python binding, [fastsimdjson](https://github.com/simdjson/fastpysimdjson), has wheels for Linux, macOS and Windows, including free-threaded Python 3.14 and 3.15.

1. Install it, and download the sample file twitter.json:

{{< highlight bash "">}}
pip install fastsimdjson     # or: uv pip install fastsimdjson
wget https://raw.githubusercontent.com/simdjson/simdjson/master/jsonexamples/twitter.json
{{< / highlight >}}

2. Use it as a drop-in replacement for the `json` module. `loads`, `load`, `dumps` and `dump` return the same values and strings as their `json` counterparts:

{{< highlight python "">}}
import fastsimdjson

doc = fastsimdjson.loads(b'{"a": [1, 2.5, "x", true, null]}')
# {'a': [1, 2.5, 'x', True, None]}
fastsimdjson.dumps(doc)              # '{"a": [1, 2.5, "x", true, null]}'
fastsimdjson.dumpb(doc)              # b'{"a":[1,2.5,"x",true,null]}', like orjson.dumps
{{< / highlight >}}

3. When you need only part of a document, `parse` returns lazy views that convert values only when you access them:

{{< highlight python "">}}
doc = fastsimdjson.parse_file("twitter.json")
print(doc["search_metadata"]["count"], "results.")
names = [s["user"]["screen_name"] for s in doc["statuses"]]
doc.at_pointer("/statuses/0/user/name")   # JSON Pointer (RFC 6901)
{{< / highlight >}}

4. Read streams of documents (NDJSON, JSON Lines). With free-threaded Python, `threads=N` parses on many threads; `fields=` extracts only the values you need:

{{< highlight python "">}}
data = open("log.ndjson", "rb").read()
for record in fastsimdjson.loads_many(data):
    ...
docs = fastsimdjson.loads_many(data, threads=16)        # a list, in order
pairs = fastsimdjson.loads_many(data, fields=["/type", "/payload/action"])
{{< / highlight >}}

5. Convert NDJSON to [Apache Arrow](https://arrow.apache.org/) tables and back, for pyarrow, polars or DuckDB, on many threads:

{{< highlight python "">}}
import pyarrow as pa
table = pa.table(fastsimdjson.loads_arrow(data))         # schema inferred
data = fastsimdjson.dumpb_arrow(table, threads=8)        # NDJSON bytes
{{< / highlight >}}

6. Convert JSON to [MessagePack](https://msgpack.org/) and back, without building Python objects:

{{< highlight python "">}}
packed = fastsimdjson.json_to_msgpack(b'{"id": 1, "tags": ["a", "b"]}')
fastsimdjson.msgpack_to_json(packed)     # b'{"id":1,"tags":["a","b"]}'
{{< / highlight >}}

See the [fastsimdjson README](https://github.com/simdjson/fastpysimdjson) for the full API.


### Documentation

Usage documentation is available:

* [Basics](https://github.com/simdjson/simdjson/blob/master/doc/basics.md) is an overview of how to use simdjson and its APIs.
* [Builder](https://github.com/simdjson/simdjson/blob/master/doc/builder.md) is an overview of how to efficiently write JSON strings using simdjson.
* [Performance](https://github.com/simdjson/simdjson/blob/master/doc/performance.md) shows some more advanced scenarios and how to tune for them.
* [Implementation Selection](https://github.com/simdjson/simdjson/blob/master/doc/implementation-selection.md) Selection describes runtime CPU detection and how you can work with it.


###  Real-world usage

- [Node.js](https://github.com/nodejs/node)
- [Ladybird Browser](https://github.com/LadybirdBrowser/ladybird)
- [ClickHouse](https://github.com/ClickHouse/ClickHouse)
- [milvus](https://github.com/milvus-io/milvus)
- [Dgraph](https://github.com/dgraph-io/dgraph)
- [QuestDB](https://github.com/questdb/questdb)
- [Apache Arrow](https://github.com/apache/arrow)
- [Apache Doris](https://github.com/apache/doris)
- [StarRocks](https://github.com/StarRocks/starrocks)
- [WatermelonDB](https://github.com/Nozbe/WatermelonDB)
- [WasmEdge](https://github.com/WasmEdge/WasmEdge)
- [mamba](https://github.com/mamba-org/mamba)
- [GreptimeDB](https://github.com/GreptimeTeam/greptimedb)
- [YDB](https://github.com/ydb-platform/ydb)
- [Meta Velox](https://github.com/facebookincubator/velox)
- [Intel PCM](https://github.com/intel/pcm)
- [Timeplus Proton](https://github.com/timeplus-io/proton)
- [ByConity](https://github.com/ByConity/ByConity)
- [ada-url](https://github.com/ada-url/ada)
- [UCall](https://github.com/unum-cloud/UCall)
- [Clang Build Analyzer](https://github.com/aras-p/ClangBuildAnalyzer)
- [TiFlash](https://github.com/pingcap/tiflash)
- [SereneDB](https://github.com/serenedb/serenedb)
- [tenzir](https://github.com/tenzir/tenzir)
- [RonDB](https://github.com/logicalclocks/rondb)
- [fastgron](https://github.com/adamritter/fastgron)
- [fastgltf](https://github.com/spnda/fastgltf)
- [Google Pax](https://github.com/google/paxml)
- [ata-validator](https://github.com/ata-core/ata-validator)
- [Shopify HeapProfiler](https://github.com/Shopify/heap-profiler)
- [Microsoft FishStore](https://github.com/microsoft/FishStore)

If you are planning to use simdjson in a product, please work from one of our releases.

### Official companion libraries

The simdjson organization publishes libraries built on simdjson:

- [fastsimdjson](https://github.com/simdjson/fastpysimdjson): our official Python binding (`pip install fastsimdjson`). A drop-in replacement for the `json` module's `loads`, `load`, `dumps` and `dump`, over 3 times faster than the standard library. It also offers lazy parsing, multithreaded NDJSON with free-threaded Python, and conversion to Apache Arrow and MessagePack. Available on [PyPI](https://pypi.org/project/fastsimdjson/).
- [simdjson_arrow](https://github.com/simdjson/simdjson_arrow): reads newline-delimited JSON into [Apache Arrow](https://arrow.apache.org/) record batches, and writes Arrow record batches as JSON, on one thread or many. Several times faster than Arrow C++'s own JSON reader.
- [simdjson_msgpack](https://github.com/simdjson/simdjson_msgpack): converts JSON to [MessagePack](https://msgpack.org/) and back, one document or many, on many threads.

###  Bindings and Ports of simdjson

We distinguish between "bindings" (which just wrap the C++ code) and a port to another programming language (which reimplements everything).

- [ZippyJSON](https://github.com/michaeleisel/zippyjson): Swift bindings for the simdjson project.
- [fastsimdjson](https://github.com/simdjson/fastpysimdjson): our official Python bindings.
- [libpy_simdjson](https://github.com/gerrymanoim/libpy_simdjson/): high-speed Python bindings for simdjson using [libpy](https://github.com/quantopian/libpy).
- [pysimdjson](https://github.com/TkTech/pysimdjson): Python bindings for the simdjson project.
- [cysimdjson](https://github.com/TeskaLabs/cysimdjson): high-speed Python bindings for the simdjson project.
- [simdjson-rs](https://github.com/simd-lite/simd-json): Rust port.
- [simdjson-rust](https://github.com/SunDoge/simdjson-rust): Rust wrapper (bindings).
- [SimdJsonSharp](https://github.com/EgorBo/SimdJsonSharp): C# version for .NET Core (bindings and full port).
- [simdjson_nodejs](https://github.com/luizperes/simdjson_nodejs): Node.js bindings for the simdjson project.
- [simdjson_php](https://github.com/crazyxman/simdjson_php): PHP bindings for the simdjson project.
- [fast_jsonparser](https://github.com/anilmaurya/fast_jsonparser): Ruby bindings for the simdjson project.
- [simdjson_ruby](https://github.com/saka1/simdjson_ruby): Ruby bindings for the simdjson project.
- [simdjson-go](https://github.com/minio/simdjson-go): Go port using Golang assembly.
- [rcppsimdjson](https://github.com/eddelbuettel/rcppsimdjson): R bindings.
- [simdjson_erlang](https://github.com/ChomperT/simdjson_erlang): erlang bindings.
- [lua-simdjson](https://github.com/FourierTransformer/lua-simdjson): lua bindings.
- [hermes-json](https://hackage.haskell.org/package/hermes-json): haskell bindings.
