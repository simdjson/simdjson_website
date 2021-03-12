+++
#title = "About"
layout = "single-para"
+++

To our knowledge, simdjson is the first fully-validating JSON parser
to run at gigabytes per second on commodity processors. It can parse millions of JSON documents
per second on a single core.
It takes advantage of modern microarchitectures, parallelizing with SIMD vector
instructions, reducing branch misprediction, and reducing data dependency to take advantage of each
CPU's multiple execution cores.

You may use simdjson for more than just parsing JSON. It offers functions to
minify JSON documents at 6 GB/s or  validate UTF-8 strings at 13 GB/s.
The simdjson library offers high speed whether it processes tiny files (e.g., 300 bytes)
or larger files (e.g., 3MB). 

For Newline-Delimited JSON files, we can exceed 3 GB/s with [our  multithreaded parsing functions](https://github.com/simdjson/simdjson/blob/master/doc/parse_many.md).


#### Funding

The work is supported by the Natural Sciences and Engineering Research Council of Canada under grant number RGPIN-2017-03910.

#### License

This code is made available under the Apache License 2.0.

Some of our command-line tools use the cxxopts library: it is under the liberal (business-friendly) MIT license.

Under Windows, we build some tools using the windows/dirent_portable.h file (which is outside our library code): it is under the liberal (business-friendly) MIT license.

For some benchmarking tasks, we use Google Benchmark. It is under the Apache License 2.0.