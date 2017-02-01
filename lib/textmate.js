// https://github.com/idleberg/atom-atomizr/blob/v0.22.0/lib/includes/textmate.coffee
// ---
// generated by coffee-script 1.9.2

// const parseJson = require('parse-json');
const plist = require('plist');
const uuid = require('uuid');

module.exports = {
    read_plist: function(input, options) {
        let data, output;

        try {
            data = plist.parse(input);
        } catch (error) {
            throw error;
        }

        let scope = options.scope ? options.scope : data.scope;

        if (!((data.content != null) && (data.tabTrigger != null) && (scope != null))) {
            return console.warn('This doesn\'t seem to be a valid TextMate snippet file. Aborting.');
        }

        output = {
            scope: scope,
            completions: [
                {
                    contents: data.content,
                    trigger: data.tabTrigger
                }
            ]
        };

        return output;
    },

    write_plist: function(input) {
        let data, name, output;

        if (input.completions[0].description) {
            name = input.completions[0].description;
        } else {
            name = input.completions[0].trigger;
        }

        // Remove leading dot
        if (input.scope[0] === '.') {
            input.scope = input.scope.substr(1);
        }

        data = {
            content: input.completions[0].contents,
            tabTrigger: input.completions[0].trigger,
            name: name,
            scope: input.scope,
            uuid: uuid.v4()
        };

        output = plist.build(data);
        return output;
    }
};