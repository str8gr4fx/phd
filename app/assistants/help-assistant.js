function HelpAssistant()
{
	
}

HelpAssistant.prototype.setup = function()
{
	// setup back tap
	this.backElement = this.controller.get('icon');
	this.backTapHandler = this.backTap.bindAsEventListener(this);
	this.controller.listen(this.backElement, Mojo.Event.tap, this.backTapHandler);

	this.controller.get('help-title').innerHTML = $L("Help");
	this.controller.get('help-support').innerHTML = $L("Support");
	
	// setup menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, {visible: false});
	
	this.controller.get('appname').innerHTML = Mojo.appInfo.title + $L(" (PHD)");
	this.controller.get('appdetails').innerHTML = Mojo.appInfo.version + $L(" by WebOS Internals");
	
	this.supportModel = 
	{
		items: []
	};
	
	this.supportModel.items.push({
		text: $L('PHD Forum Thread'),
		detail: 'http://bit.ly/webos-phd-m',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('PreCentral Forums'),
		detail: 'http://m.forums.precentral.net/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('webOSroundup Forums'),
		detail: 'http://forum.webosroundup.com/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('WebOS Internals Wiki'),
		detail: 'http://www.webos-internals.org/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('PreCentral.net'),
		detail: 'http://m.precentral.net/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('webOSroundup'),
		detail: 'http://www.webosroundup.com/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('WebOS World'),
		detail: 'http://www.webosworld.com/',
		Class: 'img_web',
		type: 'web'
	});
	this.supportModel.items.push({
		text: $L('IRC Channel'),
		detail: 'http://webchat.freenode.net?channels=webos-internals',
		Class: 'img_web',
		type: 'web'
	});
 	this.supportModel.items.push({
		text: $L('Changelog'),
		Class: 'img_changelog',
		type: 'changelog'
	});
	
	this.controller.setupWidget
	(
		'supportList', 
		{
			itemTemplate: "help/rowTemplate",
			swipeToDelete: false,
			reorderable: false
		},
		this.supportModel
	);
	
	this.controller.listen('supportList', Mojo.Event.listTap, this.listTapHandler.bindAsEventListener(this));
	
}
HelpAssistant.prototype.listTapHandler = function(event)
{
	switch (event.item.type)
	{
		case 'web':
			this.controller.serviceRequest("palm://com.palm.applicationManager", 
			{
				method: "open",
				parameters: 
				{
					id: 'com.palm.app.browser',
					params: 
					{
						target: event.item.detail
					}
				}
			});
			break;
			
		case 'email':
			this.controller.serviceRequest('palm://com.palm.applicationManager', 
			{
				method: 'open',
				parameters: 
				{
					target: 'mailto:' + event.item.address + "?subject=" + Mojo.appInfo.title + " " + event.item.subject
				}
			});
			break;
			
		case 'changelog':
			this.controller.stageController.pushScene('startup', true);
			break;
			
		case 'scene':
			this.controller.stageController.pushScene(event.item.detail);
			break;
	}
}

HelpAssistant.prototype.backTap = function(event)
{
	this.controller.stageController.popScene();
};

HelpAssistant.prototype.activate = function(event) {}
HelpAssistant.prototype.deactivate = function(event) {}
HelpAssistant.prototype.cleanup = function(event)
{
	this.controller.stopListening(this.backElement,  Mojo.Event.tap, this.backTapHandler);
	this.controller.stopListening('supportList', Mojo.Event.listTap, this.listTapHandler.bindAsEventListener(this));
}
