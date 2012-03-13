
$(function() {

    $( '.attendn' ).each(function() {

        var container = $( this );
        var appId = container.data( 'parseappid' );
        var restKey = container.data( 'parserestkey' );
        var meetupId = container.data( 'meetupid' );
        var peopleContainer = $( '<ul></ul>' );
        var controls = $( '<div></div>' )
            .addClass( 'controls' )
            .append( '<span>@</span>' );
        var input = $( '<input type="text" />' )
            .addClass( 'name' )
            .appendTo( controls );

        var addPerson = function( person ) {
            var item = $( '<li></li>' );
            $( '<img></img>' )
                .attr({ src: 'http://api.twitter.com/1/users/profile_image/' +person.name+ '.format' })
                .appendTo( item );
            $( '<a></a>' )
                .attr({ href: 'http://twitter.com/' +person.name })
                .html( person.name )
                .appendTo( item );
            item.prependTo( peopleContainer );
        };

        var onPeopleLoaded = function( res ) {
            $.each( res.results, function(i,person) {
                addPerson( person );
            });
        };

        var api = function( method, data, callback, objectId ) {
            var config = {
                type: method,
                dataType: 'json',
                contentType: 'application/json',
                headers: { "X-Parse-Application-Id": appId,
                           "X-Parse-REST-API-Key": restKey },
                url: 'https://api.parse.com/1/classes/' + encodeURIComponent( meetupId ),
                data: JSON.stringify( data ),
                success: callback
            };
            if ( objectId ) { config.url += '/' +objectId; }
            $.ajax( config );
        };

        var addPersonClicked = function( event ) {
            var person = { name:input.val() };
            api( 'POST', person, function(json) {
                addPerson( $.extend(person,json) );
            });
            input.val( '' );
        };

        $( '<input type="button" />' )
            .addClass( 'submit' )
            .val( 'Add me!' )
            .click( addPersonClicked )
            .appendTo( controls );

        controls.appendTo( container );
        peopleContainer.appendTo( container );

        api( 'GET', '', onPeopleLoaded );

    });   

});

