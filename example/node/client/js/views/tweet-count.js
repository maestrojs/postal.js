define( [
	'jquery',
	'backbone',
	'text!views/templates/tweet-count.html',
	'models/tweet-count-model',
	'bus'
],
	function ( $, Backbone, template, TweetCountModel, bus ) {
		"use strict";

		return Backbone.View.extend( {
			tagName : "div",

			initialize : function () {
				_.bindAll( this );
				this.template = _.template( template );
				this.model = new TweetCountModel();
				bus.app.subscribe( "search.info", this.setCurrentSearch );
				this.model.bind( "change", this.render );
				this.inDom = false;
				bus.stats.publish( { topic : "tweet-count.getLatest", data : {} } );
			},

			render : function () {
				// TODO: Capture scroll position and restore after render...
				this.$el.html( this.template( this.model.toJSON() ) );
				if ( !this.inDom ) {
					this.$el.appendTo( "#stats" );
					this.inDom = true;
				}
			},

			show : function ( data ) {
				this.$el.show();
			},

			hide : function ( data ) {
				this.$el.hide();
			}
		} );
	} );