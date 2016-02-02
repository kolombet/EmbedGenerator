package
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author kir
	 */
	public class Main extends Sprite 
	{
		private var data:Array;
		private var counter:int = 0;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			data = Embed.init();
			for (var i:int = 0; i < data.length; i++)
			{
				addChild(data[i]);
				data[i].visible = false;
			}
			
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
		}
		
		private function onEnterFrame(e:Event = null):void
		{
			counter++;
			for (var i:int = 0; i < data.length; i++)
			{
				data[i].visible = false;
			}
			data[counter % data.length].visible = true;
		}
	}
}