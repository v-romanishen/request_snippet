(function() {
    'use strict';
    var website = openerp.website;
    website.openerp_website = {};

    website.add_template_file('/request_snippet/static/src/xml/form.xml');
    
    website.snippet.options.request_snippet_form_settings = website.snippet.Option.extend({
        change_form_settings: function() {
            var self = this;
            let partnersList = {};

            self.$modal = $(openerp.qweb.render("request_snippet.form_for_snippet"));
            self.$modal.appendTo('body');
            self.$modal.modal();

            openerp.jsonRpc('/request/test/test_request', 'call', {}).then((respons) => {
                let $partners = $(respons.partners);
                let $multiselect = $('#custom-headers');
                let $table = $('#table tbody');

                // initialization multiselect.js 
                $multiselect.multiSelect();
                
                $partners.each((index, item) => {
                    $multiselect.multiSelect('addOption', { value: index, text: item.name });
                });

                $(".test_form").submit(function( event ) {
                    let selectArray = $multiselect.val();

                    selectArray.forEach((selectItem, selectIndex, selectArray) => {
                        $partners.each((partnerIndex, partnerItem) => {
                            if (selectItem == partnerIndex){
                                $table.append('<tr><td>' 
                                    + partnerItem.id + '</td><td>' 
                                    + partnerItem.name + '</td><td>res.partner</td></tr>'
                                );

                                console.log(partnerItem.name)
                            }

                        });
                        
                    });


                    event.preventDefault();
                });
            });

        },

        start : function () {
            var self = this;
            this.$el.find(".js_form_settings").on("click", _.bind(this.change_form_settings, this));
            this._super();
        },
    
    
    });

    // TEST OPTION EDITOR
    website.snippet.options.next_form_settings = website.snippet.Option.extend({
        change_form_settings: function() {},
        start : function () {},
    });

})();