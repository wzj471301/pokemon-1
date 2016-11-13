



Vector2 = function(x,y)
{
	this.x= 0;
	this.y =0;
	
	if (x !=null)
	this.x=x;
	if (y != null)
	this.y=y;
	
	this.previousX =0;
	this.previousY =0;
	
	this.Set =function(x,y)
	{
		if (x==null && y==null)
		{
		console.log("no x or y  ");
		}
		if (x!=null && y==null)
		{
		var pos =x.split(",");
		
		this.x =pos[0];
		this.y=pos[1];
		}
		else
		{
			this.previousX= this.x;
			this.previousY= this.y;
			if (x!=null)
				this.x =x;
				
			if (y!= null)
				this.y =y;
	
		}
	};

		this.Move =function(vec2)
	{
		this.x += vec2.x;
		this.y += vec2.y
	}
	
	
	this.Normalize =function()
	{
		var tmp =new Vector2(this.x, this.y);
		
		var mag = Math.sqrt((tmp.x * tmp.x) +(tmp.y *tmp.y));
		tmp.x = tmp.x / mag;
		tmp.y =  tmp.y / mag;
		
		return tmp;
	};
	
	this.Distance = function(vec2)
	{
		if (vec2 != null)
			return Math.sqrt(((vec2.x -this.x) * (vec2.x-this.x))+ ((this.y - vec2.y) *(this.y - vec2.y)));
		else
			return Math.sqrt(((this.previousX -this.x) * (this.previousX - this.x))+ ((this.previousY - this.y) *(this.previousY - this.y)));
	};
	
	this.HasChanged= function()
	{
		if (this.x != this.previousX || this.y != this.previousY)
			return true;
		
		return false
	};
	
	this.Difference =function(vec2, invert)
	{
		var inv =1;
		if (invert)
			inv =-1;
			
		if (vec2 == null)
			return new Vector2((this.x -this.previousX)*inv, (this.y -this.previousY)*inv);
		else
			return new Vector2((this.x-vec2.x)*inv,(this.y-vec2.y)*inv);
	};
	
	this.equals=function(vec2){
	if (this.x == vec2.x && this.y == vec2.y)
		return true;
	else 
		return false;
	}
	this.toString=function(){
	return this.x+","+this.y;
	}
	
return this;
}