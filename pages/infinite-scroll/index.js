(function($){
	// 构造测试数据
	var testData = (function(){
		var res = {
			cur:0,//游标
			timeout: 300,//模拟异步加载数据时间
			dataLength:500,
			data:null,
			init:function(){
				var imgArr = ['http://ww2.sinaimg.cn/mw1024/687c9d70gw1ers20bgbmfj20jp0iy75y.jpg',
				'http://ww1.sinaimg.cn/mw1024/687c9d70gw1f58v3qt61xj21hc0swnb0.jpg',
				'http://ww2.sinaimg.cn/mw1024/687c9d70jw1esarn32h12j21kw0w2awn.jpg',
				'http://ww4.sinaimg.cn/mw1024/687c9d70jw1etrxtg2lfyj20p018dwnm.jpg',
				'http://ww3.sinaimg.cn/mw1024/687c9d70jw1el3094weskj20jk0b0q4l.jpg',
				'http://wx4.sinaimg.cn/mw690/0067rZWEly1fhv6rahb41j30fz08g3z6.jpg',
				'http://wx4.sinaimg.cn/mw690/7bfc0806gy1fhu9a0jkklj20xc0xc129.jpg',
				'http://wx2.sinaimg.cn/mw690/81269f60ly1fhuznkn9isj20zi18ctby.jpg',
				'http://wx1.sinaimg.cn/mw690/c260f7ably1fhw9m4srs6j20l60zkdlv.jpg',
				'http://wx1.sinaimg.cn/mw690/98bf101bly1fhwjaht7sdj20j60lkjwj.jpg'
					];
				var gdata = (new Array(this.dataLength)).join('#').split('#').map(function(e, i){
					return {
						src:randomArray(imgArr),
						desc: i+'-'+ Math.round(Math.random()*100)
					};
				});
				this.data = gdata;
			},
			//模拟异步加载数据:暂时不考虑超过的问题
			loadData: function(length,fn){
				var data = this.data.slice(this.cur, this.cur+length);
				this.cur+=length;
				setTimeout(function(){
					fn(data);
				}, this.timeout);
			}
		};
		res.init();
		return res;
	})();

	function randomArray(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}

	//接受参数 wrapId\hGap\vGap\itemWidth\heightArr\column
	begin('.content');
	var scrollHandler;

	function begin(wrap){
		var wrap = $(wrap),
			cacheDom = [],
			itemHeight = 0,
			groupHeight = 0;
		var winHeight = $(window).height();
		var numGroup = 40;

			// 第一组数据渲染
			testData.loadData(numGroup, function(tdata){
				appendData(tdata);
				itemHeight = $('.item').height();
				groupHeight = $('.group').height();
			});
		    
		    // 记录滚动值，用于区分是否向下滚动

		    var stBefore = $(window).scrollTop();

		  // 监听滚动事件
		 $(window).bind('scroll.infinite',function(){
		 	scrollHandler && clearTimeout(scrollHandler);
		 	scrollHandler = setTimeout(function(){
			 	var scrollTop = $(window).scrollTop();
			 	var upIndex = currentIndex(scrollTop),
			 		downIndex = currentIndex(scrollTop + winHeight);

			 		groupBetter(upIndex, downIndex);
			 	if(scrollTop<stBefore){
			 		stBefore = scrollTop;
			 		return;
			 	}
			 	stBefore = scrollTop;
			 	if(scrollTop+winHeight>wrap.height() - itemHeight){
			 			//console.log('loading');
			 			testData.loadData(numGroup, function(edata){
				        	appendData(edata);
				        });
			 	}
		 	},30);
		 });

		 function groupBetter(uIndex, dIndex){
		 	var groups = wrap.find('.group');
		 	$.each(groups,function(index, group){
		 		group = $(group);
		 		if(index==uIndex||index==uIndex-1||index==dIndex||index==dIndex+1){
		 			if(!group.hasClass('has-data')){
		 				group.html(cacheDom[index]).addClass('has-data');
		 			}
		 		}else{
		 			group.html('').removeClass('has-data');
		 		}
		 	});

		 }

		//返回指定高度所在的分组序号（0开始）
		function currentIndex(height){
			var index = Math.floor(height/groupHeight);
			return index;
		}

		// 生成dom字符串，并添加到容器
		function appendData(data){
			var domStr;
			var desc = [
				'寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。',
				'君自故乡来，应知故乡事。来日绮窗前，寒梅著花未？',
				'寒雨连江夜入吴，平明送客楚山孤。洛阳亲友如相问，一片冰心在玉壶。',
				'万壑树参天，千山响杜鹃。山中一夜雨，树杪百重泉。汉女输橦布，巴人讼芋田。文翁翻教授，不敢倚先贤。',
				'联步趋丹陛，分曹限紫微。晓随天仗入，暮惹御香归。白发悲花落，青云羡鸟飞。圣朝无阙事，自觉谏书稀。',
				'细草微风岸，危樯独夜舟。星垂平野阔，月涌大江流。名岂文章著，官应老病休。飘飘何所似，天地一沙鸥。',
				'北阙休上书，南山归敝庐。不才明主弃，多病故人疏。 白发催年老，青阳逼岁除。永怀愁不寐，松月夜窗虚。'
			];

		    var domArr = data.map(function(e,i){
		        var date = new Date();
		        var itemId = 'item_'+i+'_'+date.getTime();
		        return '<div class="item cf" id="'
		            + itemId 
		            +'"><img src="'+e.src+'" /><p class="fr">' + e.desc + randomArray(desc) + '</p>'+'</div>';
		    });
		    
		    domStr = '<div class="group has-data">'+domArr.join('')+'</div>';
		    wrap.append(domStr);
		    var groups = $('.group');
		    var newGroup = groups.eq(groups.length-1);
		    newGroup.height(newGroup.height());
		    cacheDom.push(newGroup.html());
		}

	}
})(Zepto);