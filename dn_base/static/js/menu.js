//odoo.define('dn_base.Menu', function (require) {
//	"use strict";
//	var core = require('web.core');
//	var web_menu = require('web.Menu');
//	web_menu.include({
//		init: function() {
//			var self = this;
//			this._super.apply(this, arguments);
//			this.is_bound = $.Deferred();
//			this.data = {data:{children:[]}};
//			this.on("menu_bound", this, function() {
//				// launch the fetch of needaction counters, asynchronous
//				var $all_menus = self.$el.parents('.o_web_client').find('.o_sub_menu').find('[data-menu]');
//
//				var allmenus = [];
//				var all_menu_ids = _.map($all_menus, function (menu) {
//					allmenus.push(menu);
//					return parseInt($(menu).attr('data-menu'), 10);
//				});
//
//				$.ajax({url:window.location.origin+'/dn_base/menu_icons',success:function(data){
//					try{
//						data = JSON.parse(data);
//						data = data.data;
//						if(!Array.isArray(data))
//							return;
//						if(data.length == 0)
//							return;
//					}
//					catch(er)
//					{
//						console.log(er);
//						return;
//					}
//
//					var matches = 0;
//					for(var i in allmenus)
//					{
//						if(matches == data.length)
//							break;
//						for(var j in data)
//						{
//							if(allmenus[i].dataset.menu == data[j].menu_id)
//							{
//								matches++;
//								if(data[j].icon)
//									$(allmenus[i]).addClass(data[j].icon);
//								break;
//							}
//							if(matches == data.length)
//								break;
//						}
//					}
//				}});
//
//				if (!_.isEmpty(all_menu_ids)) {
//					this.do_load_needaction(all_menu_ids);
//				}
//			});
//			core.bus.on('do_reload_needaction', this, this.do_reload_needaction);
//			core.bus.on('change_menu_section', this, this.on_change_top_menu);
//		}
//	});
//});