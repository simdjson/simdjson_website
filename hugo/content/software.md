+++
title = "Software"
layout = "single-para"
+++

 The library is part of major linux distributions like [Ubuntu](https://packages.ubuntu.com/source/jammy/simdjson) and [Debian](https://packages.debian.org/unstable/source/simdjson) and as a FreeBSD package. It is in [Microsoft vcpkg](https://github.com/simdjson/simdjson/wiki/vcpkg). It is available as an [MSYS2 package](https://github.com/simdjson/simdjson/wiki/MSYS2), from [brew](https://formulae.brew.sh/formula/simdjson) and from conan. We publish it as single-header library as well as a CMake build from the[GitHub repository](https://github.com/simdjson/simdjson).
We have a [simdjson organization on GitHub](https://github.com/simdjson).


### Quick Start

Prerequisites: `g++` (version 7 or better)  or `clang++`(version 6 or better), and a 64-bit system (e.g., linux, Windows, FreeBSD, macOS).



1.  Pull `simdjson.h` and `simdjson.cpp` from our singleheader directory into a directory of your choice, along with the sample file twitter.json from our jsonexamples repository..
{{< highlight bash "">}}
   wget https://raw.githubusercontent.com/simdjson/simdjson/master/singleheader/simdjson.h https://raw.githubusercontent.com/simdjson/simdjson/master/singleheader/simdjson.cpp https://raw.githubusercontent.com/simdjson/simdjson/master/jsonexamples/twitter.json
{{< / highlight >}}
2. Create `quickstart.cpp`:

{{< highlight cpp "">}}
   #include "simdjson.h"
   using namespace simdjson;
   int main(void) {
      ondemand::parser parser;
      padded_string json = padded_string::load("twitter.json");
      ondemand::document tweets = parser.iterate(json);
      std::cout << uint64_t(tweets["search_metadata"]["count"]) << " results." << std::endl;
   }

{{< / highlight >}}
- Compile:
{{< highlight bash "">}}
   c++ -o quickstart quickstart.cpp simdjson.cpp -std=c++17
{{< / highlight >}}

- Run:
{{< highlight bash "">}}
   ./quickstart
{{< / highlight >}}


### Documentation

Usage documentation is available:

* [Basics](https://github.com/simdjson/simdjson/blob/master/doc/basics.md) is an overview of how to use simdjson and its APIs.
* [Performance](https://github.com/simdjson/simdjson/blob/master/doc/performance.md) shows some more advanced scenarios and how to tune for them.
* [Implementation Selection](https://github.com/simdjson/simdjson/blob/master/doc/implementation-selection.md) describes runtime CPU detection and
  how you can work with it.

###  Real-world usage

- [Microsoft FishStore](https://github.com/microsoft/FishStore)
- [Yandex ClickHouse](https://github.com/yandex/ClickHouse)
- [Clang Build Analyzer](https://github.com/aras-p/ClangBuildAnalyzer)
- [Shopify HeapProfiler](https://github.com/Shopify/heap-profiler)

If you are planning to use simdjson in a product, please work from one of our releases.

###  Bindings and Ports of simdjson

We distinguish between "bindings" (which just wrap the C++ code) and a port to another programming language (which reimplements everything).

- [ZippyJSON](https://github.com/michaeleisel/zippyjson): Swift bindings for the simdjson project.
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
