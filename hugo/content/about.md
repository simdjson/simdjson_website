+++
#title = "About"
layout = "single-para"
+++

To our knowledge, simdjson is the first fully-validating JSON parser
to run at gigabytes per second on commodity processors. It can parse millions of JSON documents
per second on a single core.
It takes advantage of modern microarchitectures, parallelizing with SIMD vector
instructions, reducing branch misprediction, and reducing data dependency to take advantage of each
CPU's multiple execution cores. We support ARM NEON, SSSE3, AVX2, AVX-512, RISC-V, Loongarch, and POWER instructions.

You may use simdjson for more than just parsing JSON. It offers functions to
minify JSON documents at 12 GB/s.
The simdjson library offers high speed whether it processes tiny files (e.g., 300 bytes)
or larger files (e.g., 3MB). You can also generate JSON strings at gigabytes per second.
For Newline-Delimited JSON files, we can exceed 3 GB/s with [our  multithreaded parsing functions](https://github.com/simdjson/simdjson/blob/master/doc/iterate_many.md).

#### License

This code is made available under the Apache License 2.0.
