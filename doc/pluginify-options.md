@typedef {{}} stealTools.pluginify.options pluginifyOptions

Specify the behavior of pluginify.

@option {Array.<RegExp|String>} [ignore] An Array of regular expression or strings that 
are used to specify [moduleName]'s that should not be included in the 
output.  

Module names that match the regular expressions are not included. The following
ignores everything in _can/util/_.

    pluginify("can/construct",{ignore: [/^can\/util\/]});


Module names and their dependenceis that match the 
strings in the array are not included. The following will not include
"can/construct" and all of its dependencies:

    pluginify("can/component",{ignore: ["can/construct"]});

@option {Boolean} [removeDevelopmentCode=true] By default, removes code in between comments like:

    //!steal-remove-start
    REMOVE.THIS;
    //!steal-remove-end

If removeDevelopmentCode is `false`, this code is not removed.

@option {String} [format='global'] What format the output will be transpiled to.  By default
the format is `"global"`.  `"global"` means the code will be transpiled to work
standalone.  Module dependencies that are not included should be mapped to their
name on the global object in exports.

The other possible format values are "steal","amd", and "cjs".

@option {Object<moduleName,String>} export A mapping of module names to their name on the
global object.  For example, if an output depends on jQuery, but does not include it, you
should include:

    pluginify("mywidget",{exports: {"jquery": "jQuery"}})

__note__ - In future release, 
these values will be taken directly from [System.shim] configuration values.

@option {Boolean} [useNormalizedDependencies=true] Use normalized dependency names instead of
relative module names.  For example "foo/bar" will be used instead of "./bar".

@option {function(String, String, String)} [normalize(name, currentModule, address)] An
optional function that will normalize all module names written out. Use this for custom normalization
behavior.

@option {Boolean} [minify=false] By default, the output is not minified.
Set to `true` to minify the result.

@option {Boolean} [ignoreAllDependencies=false] By default, the dependencies of
the module specified are included unless they are explicitly ignored.  Setting
_ignoreAllDependencies_ to `true` only results in returning that individual module
as the output.

@option {includeTraceurRuntime} [includeTraceurRuntime=true] By default, if an ES6 module
is found, the [@traceur] runtime is packaged with the output.  Setting this to `false`
prevents that behavior.