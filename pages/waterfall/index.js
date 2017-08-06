/*
主要逻辑：
	初始化：计算每一排的容量，由于图片加载是异步的，所以这里的处理是，优先js加载图片，等加载完毕后回调
	此时直接将一排的dom放入容器时，就没有异步等待时间了，
	放入dom之后，计算每个dom的高度，存到单排高度数组中。
	
	后续：
		滚动触发：获取单排高度数组最小值，计算页面可视区域是否已有必要加载新数据（最小高度-150px）

		获取新数据，先加载图片，等待加载完毕回调，dom放入容器，计算dom高度，覆盖单排高度数组的同时，
		给刚加入的dom设置绝对定位的位置

*/
(function(){
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
						src:imgArr[Math.floor(Math.random()*imgArr.length)],
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

	//接受参数 wrapId\hGap\vGap\itemWidth\heightArr\column
	begin('wrap', 300, 20, 20);
	var resizeHandler,
		scrollHandler;
	// 监听窗口调整
	$(window).resize(function(){
		resizeHandler && clearTimeout(resizeHandler);
		resizeHandler = setTimeout(function(){
			//console.log(document.documentElement.clientWidth,$('#wrap').width());
			$(window).unbind('scroll.infinite');
			begin('wrap', 300, 20, 20);

		}, 20);
	});

	function begin(wrapId, itemWidth, hGap, vGap){
		var wrap = $('#'+wrapId),
			wrapWidth = wrap.width(),
			cacheDom = [],
			cacheTop = [0],
			//单元宽加边距
			iw = hGap + itemWidth,
			//一排能放多少个单元
			column = Math.floor((wrapWidth+hGap)/iw),
			//存放每一排的单元高度数组，用于下一排的排列
			heightArr = [],
			curLen = 0;
		var curHeight = 0;
		var winHeight = $(window).height();
		var numGroup = column * 10;

			// 调整容器居中
			wrap.css({left: (wrapWidth - iw*column + hGap)/2 + 'px'});
			//初始化高度数组
			for(var i = 0;i < column; i++){
				heightArr.push(0);
			}

			// 第一组数据渲染
			testData.loadData(numGroup, function(tdata){
				loadImgs(tdata, function(data){
			        appendData(data, true);
			        flow(true, column);
			    });
			});
		    
		    // 记录滚动值，用于区分是否向下滚动

		    var stBefore = $(window).scrollTop();

		  // 监听滚动事件
		 $(window).bind('scroll.infinite',function(){
		 	scrollHandler && clearTimeout(scrollHandler);
		 	scrollHandler = setTimeout(function(){
			 	var scrollTop = $(window).scrollTop();
			 	//console.log(scrollTop, winHeight,getMinTop().height);
			 	var upIndex = beforeWho(scrollTop),
			 		downIndex = beforeWho(scrollTop + winHeight);

			 		groupBetter(upIndex, downIndex);
			 	if(scrollTop<stBefore){
			 		stBefore = scrollTop;
			 		return;
			 	}
			 	stBefore = scrollTop;
			 	//console.log(scrollTop);
			 	// 触发加载应该是，当接近最短列高度之前就触发加载
			 	if(scrollTop+winHeight>getMinTop().height - 150){
			 			//console.log('loading');
			 			testData.loadData(numGroup, function(edata){
				        	extraItems(edata);
				        });
			 	}
		 	},20);
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
		 function groupBack(groups, arrIndex){
		 	var len = groups.length;
		 	var group,cleaned;
		 	arrIndex.forEach(function(item, index){
		 		if(item>=0 && item<len){
		 			group = groups.eq(item);
		 			cleaned = !group.hasClass('has-data');
		 			if(cleaned){
		 				group.html(cacheDom[item]).addClass('has-data');
		 			}
		 		}
		 	});
		 }


		// 获取最短一列的高度和列序号
		function getMinTop(){
		    var res = heightArr[0],
		        ri = 0;
		    heightArr.slice(1).forEach(function(e, i){
		        if(e<res){
		            res = e;
		            ri = i+1;
		        }
		    })
		    return {
		        height: res,
		        index: ri
		    };
		}

		function getMaxTop(){
		    var res = heightArr[0],
		        ri = 0;
		    heightArr.slice(1).forEach(function(e, i){
		        if(e>res){
		            res = e;
		            ri = i+1;
		        }
		    })
		    return {
		        height: res,
		        index: ri
		    };
		}

		// 继续加载数据
		function extraItems(data){
			if(!data.length){
				return;
			}
		   // 对数据进行 加载图片 ， 加载完之后 dom字符串生成， 生成后添加到容器，添加完进行布局处理 
		    loadImgs(data, function(data){
		        appendData(data);
		        flow(false);
		    });
		    
		}
		//返回指定高度所在的分组序号（0开始）
		function beforeWho(height){
			var i = 0,
				len = cacheTop.length;
			for(;i<len;i++){
				if(cacheTop[i]>height){
					break;
				}
			}
			return i-1;
		}

		//对容器内往后的内容做布局，分第一组数据和后续数据布局
		//第一组要做有个步骤，一个是针对首排，一个是剩下的布局（可以当做第二组）
		function flow(first,len){
		    var group = wrap.find('.group');
		    group = group.eq(group.length - 1);
		    var lefts;
		    var items = [].slice.call(group.find('.item'));
		    if(first){
		    	first = items.slice(0, len);
		   		lefts = items.slice(len);
		    	domFlow(first, true);
		    	domFlow(lefts);
		    }else{
		    	domFlow(items);
		    }
		    //缓存每一组起点高度（当前组结尾最短位置就是下一组的起点）
		    var minTop = getMinTop();
		    cacheTop.push(minTop.height);
		    //缓存每一组dom
		    cacheDom.push(group.html());
		    //group.height(minTop.height);
		    //console.log(cacheDom);
		}
		function domFlow(doms, first){
			doms.forEach(function(e, i){
		        var cur;
		        e = $(e);
		        var height = e.outerHeight();
		        if(first){
		        	e.css({
			            left: iw*i+ 'px',
			            top: 0
			        });
		        }else{
		        	cur = getMinTop();
			        e.css({
			            left: iw*cur.index + 'px',
			            top: cur.height + vGap + 'px'
			        });
		        }
		        e.show();
		        cur?(heightArr[cur.index] = cur.height+vGap+height)
		        : heightArr[i] = height;
		    });
		    var arrMaxTop = getMaxTop().height;
		    if(arrMaxTop>curHeight){
		    	curHeight = arrMaxTop;
		    	wrap.css({height: curHeight});
		    }
		}

		// 生成dom字符串，并添加到容器
		function appendData(data, first){//是否还有必要加id？
			var domStr;
		    var domArr = data.map(function(e,i){
		        var date = new Date();
		        var itemId = 'item_'+i+'_'+date.getTime();
		        return '<div class="item" id="'
		            + itemId 
		            +'"><img src="'+e.src+'" /><p>' + e.desc + '</p>'+'</div>';
		    });
		    
		    domStr = '<div class="group has-data">'+domArr.join('')+'</div>';
		    first? wrap.html(domStr):wrap.append(domStr);
		}

		//加载所有图片后触发回调
		function loadImgs(data, cbk){
		    var i = 0;
		    var len = data.length;
		    (function loadImg(){
		        var img = new Image();
		        img.onload = img.onerror = function(){
		            i++;
		            if(i==len){//全部加载完毕了
		                cbk(data);
		            }else{
		                loadImg();
		            }
		        };
		        img.src = data[i].src; 
		    })();
		    
		}
	}
})();