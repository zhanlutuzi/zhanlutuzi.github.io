---
layout: "post"
title: "Python Convert CSV to Shapefile"
date: "2022-09-28 00:00:00 +0800"
author: "zhanlutuzi"
permalink: "/2022/09/28/python-convert-csv-to-shapefile/"
categories: ["教程"]
tags: ["GIS", "编程", "Python"]
summary: "使用Python处理csv文件并转为shapefile"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/1920px-Pandas_logo.svg.png"
comments: true
render_with_liquid: false
---

<h2 id="要准备"><a href="#要准备" class="headerlink" title="要准备"></a>要准备</h2><ul>
<li>pandas</li>
<li>geopandas</li>
</ul>
<h2 id="具体实现"><a href="#具体实现" class="headerlink" title="具体实现"></a>具体实现</h2><p>思想是这样的</p>
<ol>
<li>将要转化的csv文件放到List里</li>
<li>使用for循环遍历</li>
<li>在for循环内<ol>
<li>使用pandas读入csv</li>
<li>选取需要进行计算的列赋值给csvFileCal</li>
<li>将NaN设置为0（这是我此处的计算需要）</li>
<li>再将算出的结果添加到csvFile末尾，这样既保留了NaN的值，又计算出了正确的结果（因为在计算中如果具有NaN，计算结果也会是NaN）</li>
<li>将DataFrame转换为GeoDataFrame(这里仅有点对象，如果你还包含面对象的话还需要考虑别的方法)</li>
<li>设定好坐标系为WGS84(espg:4326)</li>
<li>调用GeoPandas的方法输出为shapefile文件</li>
</ol>
</li>
</ol>
<pre class="line-numbers language-python" data-language="python"><code class="language-python"><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token keyword">import</span> geopandas <span class="token keyword">as</span> gpd

<span class="token comment"># The code below is used to convert the csv file into a shapefile.</span>
nameList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'india&amp;Pakistan91_95'</span><span class="token punctuation">,</span> <span class="token string">'india&amp;Pakistan96_00'</span><span class="token punctuation">,</span> <span class="token string">'india&amp;Pakistan01_05'</span><span class="token punctuation">,</span> <span class="token string">'india&amp;Pakistan06_10'</span><span class="token punctuation">,</span> <span class="token string">'india&amp;Pakistan11_15'</span><span class="token punctuation">,</span> <span class="token string">'india&amp;Pakistan16_20'</span><span class="token punctuation">]</span>

<span class="token keyword">for</span> name <span class="token keyword">in</span> nameList<span class="token punctuation">:</span>
    csvpath <span class="token operator">=</span> <span class="token string">r"D:\Desktop\StuInnovate\data\GTD\筛选\{}.csv"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    csvFile <span class="token operator">=</span> pd<span class="token punctuation">.</span>read_csv<span class="token punctuation">(</span>csvpath<span class="token punctuation">)</span>
    
    csvFileCal <span class="token operator">=</span> csvFile<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'latitude'</span><span class="token punctuation">,</span> <span class="token string">'longitude'</span><span class="token punctuation">,</span><span class="token string">'nkill'</span><span class="token punctuation">,</span><span class="token string">'nwound'</span><span class="token punctuation">,</span><span class="token string">'property'</span><span class="token punctuation">,</span><span class="token string">'nhostkid'</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    csvFileCal<span class="token punctuation">.</span>fillna<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> inplace<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> <span class="token comment">#将NaN设置为0</span>
    
    csvFileCal<span class="token punctuation">[</span><span class="token string">'severeIndex'</span><span class="token punctuation">]</span> <span class="token operator">=</span> csvFileCal<span class="token punctuation">[</span><span class="token string">'nkill'</span><span class="token punctuation">]</span> <span class="token operator">+</span> csvFileCal<span class="token punctuation">[</span><span class="token string">'nwound'</span><span class="token punctuation">]</span> <span class="token operator">+</span> csvFileCal<span class="token punctuation">[</span><span class="token string">'property'</span><span class="token punctuation">]</span> <span class="token operator">+</span> csvFileCal<span class="token punctuation">[</span><span class="token string">'nhostkid'</span><span class="token punctuation">]</span>
    
    csvFile<span class="token punctuation">[</span><span class="token string">'severeIndex'</span><span class="token punctuation">]</span> <span class="token operator">=</span> csvFileCal<span class="token punctuation">[</span><span class="token string">'severeIndex'</span><span class="token punctuation">]</span>
    geoGDF <span class="token operator">=</span> gpd<span class="token punctuation">.</span>GeoDataFrame<span class="token punctuation">(</span>csvFile<span class="token punctuation">,</span> geometry<span class="token operator">=</span>gpd<span class="token punctuation">.</span>points_from_xy<span class="token punctuation">(</span>csvFile<span class="token punctuation">.</span>longitude<span class="token punctuation">,</span> csvFile<span class="token punctuation">.</span>latitude<span class="token punctuation">)</span><span class="token punctuation">)</span>
    geoGDF<span class="token punctuation">.</span>crs <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'init'</span><span class="token punctuation">:</span> <span class="token string">'epsg:4326'</span><span class="token punctuation">}</span>
    geoGDF<span class="token punctuation">.</span>to_file<span class="token punctuation">(</span><span class="token string">r"D:\Desktop\StuInnovate\data\GTD\shp\{}.shp"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> driver<span class="token operator">=</span><span class="token string">'ESRI Shapefile'</span><span class="token punctuation">)</span>
<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span></code></pre>
