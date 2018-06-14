(function() {
    'use strict';
    var website = openerp.website;
    website.openerp_website = {};

    website.add_template_file('/request_snippet/static/src/xml/form.xml');
    
    website.snippet.options.request_snippet_form_settings = website.snippet.Option.extend({
        change_form_settings: function() {
            var self = this;
            let partnersList = {};
            // openerp.jsonRpc('/request/test/test_request', 'call', {}).then((respons) => {
            //     $(respons.partners).each((index, item) => {
            //         $('#table').append('<tr><td>' + item.id + '</td><td>' + item.name + '</td></tr>');
            //     })
            // });



            self.$modal = $(openerp.qweb.render("request_snippet.form_for_snippet"));
            self.$modal.appendTo('body');
            self.$modal.modal();

            openerp.jsonRpc('/request/test/test_request', 'call', {}).then((respons) => {
                let $partners = $(respons.partners);
                $partners.each((index, item) => {
                    // $('#table tbody').append('<tr><td>' 
                    //     + item.id + '</td><td>' 
                    //     + item.name + '</td><td>res.partner</td></tr>'
                    // );
    
                    $('#exampleFormControlSelect1').append(
                        '<option>' + item.name + '</option>'
                    );
    
                    $('#example-collapse').append(
                        '<option value="' + index + '">' + item.name + '</option>'
                    );

                    // $( "#target" ).submit(function( event ) {
                    //     alert( "Handler for .submit() called." );
                    //     event.preventDefault();
                    // });

                });

                $( ".test_form" ).submit(function( event ) {
                    let selectArray = $('select#example-collapse').val();
                    // console.log( "selectArray: " + selectArray );
                    // selectArray.forEach((selectItem, selectIndex, selectArray) => {
                    //     console.log( "==============: " + selectItem );
                    // })

                    selectArray.forEach((selectItem, selectIndex, selectArray) => {
                        // console.log( "selectArray.forEach: " + selectItem );

                        $partners.each((partnerIndex, partnerItem) => {
                            // console.log( "$partners.each: " + partnerItem );

                            if (selectItem == partnerIndex){

                                $('#table tbody').append('<tr><td>' 
                                    + partnerItem.id + '</td><td>' 
                                    + partnerItem.name + '</td><td>res.partner</td></tr>'
                                );

                                console.log(partnerItem.name)

                            }

                        });
                        
                    });


                    // $select.each((selectIndex, selectItem) => {

                    //     $partners.each((partnerIndex, partnerItem) => {
                    //         if (selectItem === partnerIndex){
                    //             $('#table tbody').append('<tr><td>' 
                    //                 + item.id + '</td><td>' 
                    //                 + item.name + '</td><td>res.partner</td></tr>'
                    //             );

                    //             console.log(partnerItem.name)

                    //         }

                    //     });

                    // });


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