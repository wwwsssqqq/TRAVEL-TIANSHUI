window.onload = function(){
	var oFPic = document.getElementById("focusPic");
	var oList = oFPic.getElementsByTagName("ul")[0];
	var aImg = oFPic.getElementsByTagName("img");
	var timer = playTimer = null;
	var index = i = 0;
	var bOrder = true;
	var aTmp = [];
	var aBtn = null;
	
	//生成数字按钮
	for (i = 0; i < aImg.length; i++) 
		aTmp.push(" " + (i + 1) + " ");
	
	//插入元素
	var oCount = document.createElement("ul");
	oCount.className = "count";
	oCount.innerHTML = aTmp.join("");
	oFPic.appendChild(oCount);	
	aBtn = oFPic.getElementsByTagName("ul")[1].getElementsByTagName("li");
	
	//初始化状态
	cutover();
	
	//按钮点击切换
	for (i = 0; i < aBtn.length; i++)
	{
		aBtn[i].index = i;
		aBtn[i].onmouseover = function ()
		{
			index = this.index;
			cutover()
		}
	}
	
	function cutover(){
		for (i = 0; i < aBtn.length; i++) aBtn[i].className = "";
		aBtn[index].className = "on";			
		startMove(-(index * aImg[0].offsetHeight))
	}
	
	function next(){
		bOrder ? index++ : index--;
		index <= 0 && (index = 0, bOrder = true);
		index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false)
		cutover()
	}
	
	playTimer = setInterval(next, 3000);
	
	//鼠标移入展示区停止自动播放
	oFPic.onmouseover = function (){
		clearInterval(playTimer)
	};
	
	//鼠标离开展示区开始自动播放
	oFPic.onmouseout = function (){
		playTimer = setInterval(next, 3000)
	};
	function startMove(iTarget){
		clearInterval(timer);
		timer = setInterval(function ()
		{
			doMove(iTarget)
		}, 30)	
	}
	function doMove (iTarget){		
		var iSpeed = (iTarget - oList.offsetTop) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);		
		oList.offsetTop == iTarget ? clearInterval(timer) : oList.style.top = oList.offsetTop + iSpeed + "px"
	}
}


$(function(){
	var $fp = $("#focusPic"),
		$imgUl = $(".img",$fp),
		$img = $("img",$fp),
		aTmp = [],
		timer = null,
		i = 0,
		c = $img.size();
	for(i;i+parseInt(i+1));
		i == 0 && (aTmp[0] = "
"+1+"
")
	}
	var $count = $("
").addClass("count").html(aTmp.join("")).appendTo($fp)
	function autoPlay(){
		clearInterval(timer);
		i = 0;
		timer = setInterval(function(){
			play()
		},3000)
	}
	function play(){
		i++;
		i>c-1 && (i=0);
		$imgUl.animate({"top":-$img.height()*i})
		$count.children().removeClass("on").eq(i).addClass("on")
	}
	autoPlay()
})