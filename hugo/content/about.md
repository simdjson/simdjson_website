+++
#title = "About"
layout = "single-para"
+++


The simdjson library uses three-quarters less instructions than state-of-the-art parser RapidJSON and
fifty percent less than sajson. To our knowledge, simdjson is the first fully-validating JSON parser
to run at gigabytes per second on commodity processors. It can parse millions of JSON documents
per second on a single core.
It takes advantage of modern microarchitectures, parallelizing with SIMD vector
instructions, reducing branch misprediction, and reducing data dependency to take advantage of each
CPU's multiple execution cores.


On a Skylake processor, the parsing speeds (in GB/s) of various processors on the twitter.json file are as follows, using again GNU GCC 9 (with the -O3 flag). The popular JSON for Modern C++ library is particularly slow: it obviously trades parsing speed for other desirable features.

| parser                                | GB/s |
| ------------------------------------- | ---- |
| simdjson                              | 2.5  |
| RapidJSON UTF8-validation             | 0.29 |
| RapidJSON UTF8-valid., exact numbers  | 0.28 |
| RapidJSON insitu, UTF8-validation     | 0.41 |
| RapidJSON insitu, UTF8-valid., exact  | 0.39 |
| sajson (insitu, dynamic)              | 0.62 |
| sajson (insitu, static)               | 0.88 |
| dropbox                               | 0.13 |
| fastjson                              | 0.27 |
| gason                                 | 0.59 |
| ultrajson                             | 0.34 |
| jsmn                                  | 0.25 |
| cJSON                                 | 0.31 |
| JSON for Modern C++ (nlohmann/json)   | 0.11 |


The simdjson library offers high speed whether it processes tiny files (e.g., 300 bytes)
or larger files (e.g., 3MB). 


[All our experiments are reproducible](https://github.com/simdjson/simdjson_experiments_vldb2019).


#### Funding

The work is supported by the Natural Sciences and Engineering Research Council of Canada under grant number RGPIN-2017-03910.

#### License

This code is made available under the Apache License 2.0.

Some of our command-line tools use the cxxopts library: it is under the liberal (business-friendly) MIT license.

Under Windows, we build some tools using the windows/dirent_portable.h file (which is outside our library code): it is under the liberal (business-friendly) MIT license.

For some benchmarking tasks, we use Google Benchmark. It is under the Apache License 2.0.