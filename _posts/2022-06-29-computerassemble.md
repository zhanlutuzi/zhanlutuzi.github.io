---
layout: "post"
title: "计算机组成体系结构复习笔记"
date: "2022-06-29 00:00:00 +0800"
author: "zhanlutuzi"
permalink: "/2022/06/29/computerassemble/"
categories: ["笔记"]
tags: ["笔记", "计算机组成体系"]
summary: "期末计组复习笔记"
image: "https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220629211703502.png"
comments: true
render_with_liquid: false
---

<h1 id="整个学习的结构"><a href="#整个学习的结构" class="headerlink" title="整个学习的结构"></a>整个学习的结构</h1><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623164137961.png"></p>
<h1 id="寄存器"><a href="#寄存器" class="headerlink" title="寄存器"></a>寄存器</h1><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/%E5%AF%84%E5%AD%98%E5%99%A8.jpg" alt="MIPS中的寄存器" style="zoom: 25%;">

<p>MIPS所采用的寄存器如上图所示，下面列出几个常用的寄存器</p>
<ul>
<li><code>$zero</code>  存储唯一值——<code>0</code></li>
<li><code>$a0-\$a3</code> 这三个寄存器存储函数参数</li>
<li><code>$t0-\$t7</code>、<code>$t8-\$t9</code> 存储临时变量；注意这两组寄存器并不相连</li>
<li><code>$s0-\$s7</code> 用于保存变量的值</li>
<li><code>$sp</code> 保存栈指针；指向栈顶位置</li>
<li><code>$ra</code> 存储下一条需要执行指令的地址</li>
</ul>
<h1 id="指令自查表"><a href="#指令自查表" class="headerlink" title="指令自查表"></a>指令自查表</h1><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220622231329255.png"></p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220622231427035.png"></p>
<h1 id="汇编语言与汇编指令"><a href="#汇编语言与汇编指令" class="headerlink" title="汇编语言与汇编指令"></a>汇编语言与汇编指令</h1><h2 id="常用的MIPS指令"><a href="#常用的MIPS指令" class="headerlink" title="常用的MIPS指令"></a>常用的MIPS指令</h2><p><font color="green"><em><strong>算术运算</strong></em></font></p>
<hr>
<h3 id="add"><a href="#add" class="headerlink" title="add"></a>add</h3><p>加法</p>
<p><code>add $Destination,$num1,$num2</code></p>
<p>上述等价于—&gt; Destination = num1 +num2</p>
<h3 id="sub"><a href="#sub" class="headerlink" title="sub"></a>sub</h3><p>减法</p>
<p><code>sub $Destination,$num1,$num2</code></p>
<p>上述等价于—&gt; Destination = num1 - num2</p>
<h3 id="addi"><a href="#addi" class="headerlink" title="addi"></a>addi</h3><p>加立即数immediate</p>
<p><code>addi $Destination,$num1,num2</code></p>
<p>num2是一个数字而非寄存器</p>
<blockquote>
<p>📌注意！没有subi；subi可以用addi加负数代替</p>
</blockquote>
<h3 id="addu-amp-subu"><a href="#addu-amp-subu" class="headerlink" title="addu&amp;subu"></a>addu&amp;subu</h3><p>不检测溢出的加减法</p>
<p><code>addu $Destination,$num1,$num2</code></p>
<p><code>subu $Destination,$num1,$num2</code></p>
<blockquote>
<p>Ada检测溢出、C不检测溢出</p>
</blockquote>
<p>因此，编译器对于溢出的会按照语言的不同来转换不同的机器指令</p>
<p>addu和subu就是不检测溢出的指令</p>
<p><font color="green"><em><strong>内存相关数据传送</strong></em></font></p>
<hr>
<h3 id="lw"><a href="#lw" class="headerlink" title="lw"></a>lw</h3><p>LoadWord 从内存中加载一个<strong>字</strong>(通常是32位)</p>
<p><code>lw $t0,offset($s0)</code></p>
<p>表示从$s0指向的内存地址加offset偏移量后取得32位数据存入寄存器t0</p>
<blockquote>
<p>此处的$s0实际上存储的是一个指针</p>
</blockquote>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220621210111283.png" alt="示意图"></p>
<p>上图中内存指针指向1B;在1B的基础上+offset，以此为起始位置，取一个字放入$t0</p>
<h3 id="sw"><a href="#sw" class="headerlink" title="sw"></a>sw</h3><p>StoreWord 向内存中存储一个<strong>字</strong>(通常是32位)</p>
<p><code>sw $t0,offset($s0)</code></p>
<p>和上图原理一致，只是方向相反，取$t0的值，在$0指向的内存地址上+offset作为起始地址存储一个Word</p>
<blockquote>
<p><strong>字对齐</strong>：相邻字之间的地址相差四个字节而不是一个字节</p>
</blockquote>
<h3 id="lb-amp-sb"><a href="#lb-amp-sb" class="headerlink" title="lb&amp;sb"></a>lb&amp;sb</h3><p>LoadByte</p>
<p><code>lb $s0,3($s1) </code></p>
<p>从$s1+3的地址开始取一个Byte的数据存入$s0</p>
<blockquote>
<p>🤦‍♂️这里出现问题了，寄存器有4Byte，要存入1Byte怎么存放呢？</p>
<p>答案是将这8bits存到寄存器的低8位，高24位 <strong>符号位扩展</strong></p>
</blockquote>
<ul>
<li>对于有符号数<ul>
<li>符号位扩展：高24位与符号位相同（lb默认操作）</li>
</ul>
</li>
<li>对于无符号数<ul>
<li>零扩展：高24位均取0</li>
<li>有一条特殊指令 <code>lbu</code> LoadByteUnsighed;该指令会对高位进行零扩展</li>
</ul>
</li>
</ul>
<p>StoreByte</p>
<p><code>sb $s0,3($s1) </code></p>
<p>从$s0中取一个Byte存入内存中$s1+3的位置</p>
<blockquote>
<p>😶32位寄存器中取8位存入，那剩下的24位怎么办？</p>
</blockquote>
<p><font color="green"><em><strong>比较指令</strong></em></font></p>
<hr>
<h3 id="beq"><a href="#beq" class="headerlink" title="beq"></a>beq</h3><p>相等</p>
<p><code>$beq $reg1,$reg2,Label</code></p>
<p>当 reg1==reg2 时跳转到 Label 处</p>
<h3 id="bne"><a href="#bne" class="headerlink" title="bne"></a>bne</h3><p>不相等</p>
<p><code>$bne $reg1,$reg2,Label</code></p>
<p>当 reg1 != reg2 时跳转到 Label 处</p>
<h3 id="j"><a href="#j" class="headerlink" title="j"></a>j</h3><p>无条件跳转</p>
<p><code>j Label</code></p>
<p>跳转到 label处</p>
<h3 id="slt"><a href="#slt" class="headerlink" title="slt"></a>slt</h3><p>Set on less than;</p>
<p><code>slt reg1,reg2,reg3</code></p>
<ul>
<li>reg2&lt;reg3  reg1=1</li>
<li>否则 reg1=0</li>
</ul>
<blockquote>
<p>使用这一条指令，可以实现<code>＜</code>、<code>＞</code>、<code>≤</code>、<code>≥</code>的判断</p>
</blockquote>
<p>小于</p>
<pre class="line-numbers language-assembly" data-language="assembly"><code class="language-assembly">if (g&lt;h) goto Less; #变量映射是 g:$s0,h:$s1
------------&gt;
slt $t0,$s0,$s1
bne $t0,$0,Less<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span></span></code></pre>

<p>大于等于</p>
<pre class="line-numbers language-assembly" data-language="assembly"><code class="language-assembly">if (g≥h) goto GTE; #变量映射是 g:$s0,h:$s1
------------&gt;
slt $t0,$s0,$s1
beq $t0,$0,GTE<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span></span></code></pre>

<p>小于等于</p>
<pre class="line-numbers language-assembly" data-language="assembly"><code class="language-assembly">if (g≤h) goto LTE; #变量映射是 g:$s0,h:$s1
------------&gt;
slt $t0,$s1,$s0
beq $t0,$0,LTE<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span></span></code></pre>

<p>大于</p>
<pre class="line-numbers language-assembly" data-language="assembly"><code class="language-assembly">if (g＞h) goto LTE; #变量映射是 g:$s0,h:$s1
------------&gt;
slt $t0,$s1,$s0
bne $t0,$0,LTE<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span></span></code></pre>

<blockquote>
<p>👉还有立即数比较的<code>slti</code></p>
<p>无符号比较的<code>sltu</code></p>
</blockquote>
<p><font color="green"><em><strong>跳转指令</strong></em></font></p>
<hr>
<h3 id="jr"><a href="#jr" class="headerlink" title="jr"></a>jr</h3><p>Jump Regster 直接跳转寄存器</p>
<p><code>jr $reg</code></p>
<p>最常用的就是直接跳转到 $ra 即下一行要执行指令的位置</p>
<h3 id="jal"><a href="#jal" class="headerlink" title="jal"></a>jal</h3><p>Jump and Link 跳转并保存</p>
<p><code>jal Label</code></p>
<ol>
<li>Link 保存下一条指令的地址到$ra</li>
<li>Jump 跳转到给定标记处</li>
</ol>
<p><font color="green"><em><strong>逻辑运算</strong></em></font></p>
<hr>
<h3 id="and"><a href="#and" class="headerlink" title="and"></a>and</h3><p>按位与运算</p>
<p><code>and $reg1,$reg2,$reg3</code></p>
<p>reg1=reg2&amp;reg3</p>
<h3 id="andi"><a href="#andi" class="headerlink" title="andi"></a>andi</h3><p>与立即数进行与运算</p>
<p><code>and $reg1,$reg2,immediate</code></p>
<p>reg1=reg2&amp;immediate</p>
<blockquote>
<p>⭐使用掩码做与运算将位串的特定部分分离出来</p>
<p>1110&amp;0011 = 0010 即分离出了后两位</p>
</blockquote>
<h3 id="or"><a href="#or" class="headerlink" title="or"></a>or</h3><p>按位与运算</p>
<p><code>or $reg1,$reg2,$reg3</code></p>
<p>reg1=reg2&amp;reg3</p>
<h3 id="ori"><a href="#ori" class="headerlink" title="ori"></a>ori</h3><p>与立即数进行与运算</p>
<p><code>ori $reg1,$reg2,immediate</code></p>
<p>reg1=reg2|immediate</p>
<blockquote>
<p>⭐任何数与1做或为1，与0做或为原数—&gt;强制某些位为1</p>
</blockquote>
<h3 id="sll"><a href="#sll" class="headerlink" title="sll"></a>sll</h3><p>Shift Left Logical 逻辑左移</p>
<p><code>sll $reg1,$reg2,num</code></p>
<p>将reg2里的值左移num位放入reg1中</p>
<p><strong>空出来的位填0</strong></p>
<h3 id="srl"><a href="#srl" class="headerlink" title="srl"></a>srl</h3><p>和sll类似，不过右移num位</p>
<p><strong>空出来的位填0</strong></p>
<h3 id="sra"><a href="#sra" class="headerlink" title="sra"></a>sra</h3><p>Shift Right Arithmetic 算术右移</p>
<p>左移num位就是$ ×2^{num}$</p>
<p>右移$ ×2^{-num}$，或者说$ ÷2^{num}$</p>
<blockquote>
<p>📌要做计算的时候记得用sra</p>
</blockquote>
<h2 id="函数调用"><a href="#函数调用" class="headerlink" title="函数调用"></a>函数调用</h2><p>简单的嵌套调用可以使用寄存器约定；但是复杂的多层嵌套调用就必须<u><strong>使用栈</strong></u>了！</p>
<h3 id="寄存器约定保存信息"><a href="#寄存器约定保存信息" class="headerlink" title="寄存器约定保存信息"></a>寄存器约定保存信息</h3><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220622162149577.png" alt="寄存器约定"></p>
<h3 id="使用栈保存信息"><a href="#使用栈保存信息" class="headerlink" title="使用栈保存信息"></a>使用栈保存信息</h3><ul>
<li>手工编译</li>
</ul>
<h2 id="Caller-amp-Callee"><a href="#Caller-amp-Callee" class="headerlink" title="Caller&amp;Callee"></a>Caller&amp;Callee</h2><h1 id="机器语言"><a href="#机器语言" class="headerlink" title="机器语言"></a>机器语言</h1><ul>
<li>I-格式<ul>
<li>带立即数</li>
<li>lw&amp;sw</li>
<li>分支语句</li>
</ul>
</li>
<li>J-格式<ul>
<li>j&amp;jal</li>
</ul>
</li>
<li>R-格式<ul>
<li>其他所有指令</li>
</ul>
</li>
</ul>
<h2 id="指令格式"><a href="#指令格式" class="headerlink" title="指令格式"></a>指令格式</h2><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623085820480.png"></p>
<h3 id="R格式"><a href="#R格式" class="headerlink" title="R格式"></a>R格式</h3><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220622223829709.png"></p>
<ul>
<li>opcode: 所有R格式指令，此字段为0；和funct字段一起，共同确定具体的指令</li>
<li>rs <code>Source Register</code> 确定首操作数的寄存器</li>
<li>rt <code>Target Register</code> 确定次操作数的寄存器</li>
<li>rd <code>Destination Register</code> 指定存放计算结果的寄存器</li>
<li>shamt 包含移位指令需要移的位数；除了移位指令外，此位设为0</li>
<li><strong>add $reg1(rd),$reg2(rs),$reg3(rt)</strong></li>
</ul>
<h3 id="I格式"><a href="#I格式" class="headerlink" title="I格式"></a>I格式</h3><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220622230759838.png"></p>
<ul>
<li>opcode 独立指定指令</li>
<li>rs 指定寄存器操作数（如果有）</li>
<li>rt 指定保存计算结果的寄存器</li>
<li><strong>addi $reg1(rt) $reg2(rs) imme</strong></li>
</ul>
<blockquote>
<p>　　addi,slti  立即数<font color="green">符号扩展</font>为32位</p>
</blockquote>
<blockquote>
<p>❓这里无符号数也进行符号位扩展，为了硬件的简单牺牲一定的数据，仅对$2^{15}\le $n$\lt 2^{16}$有问题，只能由汇编器想办法解决了</p>
<p><font color="red">I格式问题</font></p>
</blockquote>
<p>如何解决I格式问题？<u><em><strong>软件中处理+新指令</strong></em></u></p>
<h4 id="lui"><a href="#lui" class="headerlink" title="lui"></a>lui</h4><p>新指令<code>lui register,immediate</code></p>
<p>Load Upper Immediate  装入立即数高位</p>
<p>取立即数并将立即数放到寄存器高位部分，剩下部分填充0</p>
<h4 id="PC-相对寻址"><a href="#PC-相对寻址" class="headerlink" title="PC-相对寻址"></a>PC-相对寻址</h4><blockquote>
<p>我们只有16位立即数，怎么解决32位分支指令？</p>
</blockquote>
<p><strong>PC-相对寻址</strong>作为32位分支指令解决方案</p>
<p>以PC为基点，分支$\pm 2^{15} $字节，保证大多数循环的寻址要求</p>
<blockquote>
<p>指令是字，满足字对齐，后两位总是00</p>
</blockquote>
<ul>
<li>指定立即数immmediate以<font color="red">字</font>作为单位</li>
</ul>
<p>这样以PC为基点，可以分支$\pm 2^{15} $个字 (或$\pm 2^{17} $个字节)，因此，可以处理的循环范围为原来的4倍</p>
<h3 id="J格式"><a href="#J格式" class="headerlink" title="J格式"></a>J格式</h3><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623084102888.png"></p>
<p>现在可以表示26位的地址</p>
<ul>
<li>由于字对齐，默认最后两位为00    +2</li>
<li>由于PC相对寻址，从PC处取最高4位     +4</li>
<li>这样26+2+4=32；我们成功表达了32位的地址</li>
</ul>
<h2 id="反汇编"><a href="#反汇编" class="headerlink" title="反汇编"></a>反汇编</h2><p>对于32位机器指令的解码遵循下面步骤</p>
<ol>
<li>把16进制转为2进制表示</li>
<li>确定opcode和指令格式<ul>
<li>opcode R:0   J:2/3    I:其他</li>
</ul>
</li>
<li>基于格式分割字段<ul>
<li>R:6 5 5 5 5 6</li>
<li>I:6 5 5 16</li>
<li>J:6 26</li>
</ul>
</li>
<li>反汇编为MIPS汇编指令</li>
</ol>
<h2 id="伪指令"><a href="#伪指令" class="headerlink" title="伪指令"></a>伪指令</h2><blockquote>
<p>不能直接转成MIPS语言，先要转成几条MIPS指令的组合</p>
</blockquote>
<p>MAL(MIPS Assembly Language) 包含伪指令</p>
<p>TAL(True Assembly Language) 不包含伪指令</p>
<p><code>C---&gt;MAL---&gt;TAL</code>翻译顺序</p>
<h3 id="一些常见的伪指令"><a href="#一些常见的伪指令" class="headerlink" title="一些常见的伪指令"></a>一些常见的伪指令</h3><h4 id="move"><a href="#move" class="headerlink" title="move"></a>move</h4><p>寄存器赋值</p>
<p><code>move $reg2,$reg1</code></p>
<p>将reg1的值赋给reg2</p>
<h4 id="li"><a href="#li" class="headerlink" title="li"></a>li</h4><p>装入立即数（Load Immediate）</p>
<p><code>li $reg,immediate</code></p>
<h4 id="la"><a href="#la" class="headerlink" title="la"></a>la</h4><p>装入地址（Load Address）</p>
<p><code>la $reg,label</code></p>
<p>把label对应的地址装入reg</p>
<h4 id="ror"><a href="#ror" class="headerlink" title="ror"></a>ror</h4><p>循环右移（Rotate Right Instruction）</p>
<p><code>ror $reg,value</code></p>
<p>把寄存器中的值循环右移value位</p>
<h4 id="错误操作的操作数"><a href="#错误操作的操作数" class="headerlink" title="错误操作的操作数"></a>错误操作的操作数</h4><p>比如addu指令写成了<code>addu $reg1,$reg2,immediate</code></p>
<p>会自动改写为<code>addiu $reg1,$reg2,immediate</code></p>
<h1 id="浮点数"><a href="#浮点数" class="headerlink" title="浮点数"></a>浮点数</h1><p>IEEE754标准</p>
<p>标准形式</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623101707172.png"></p>
<p>通过一个例子感受如何在二进制位串和十进制数字间进行转换</p>
<blockquote>
<p>0 |0110 1000|101 0101 0100 0011 0100 0010</p>
</blockquote>
<p>将上面的位串转换为十进制</p>
<ol>
<li>s=0 正数</li>
<li>expont = 104   偏移调整104-127=-23</li>
<li>significand = 1+1*$2^{-1}$+0*$2^{-2}$+1*$2^{-3}$+…+0*$2^{-23}$ = 1+0.666115</li>
<li>1.666115*$2^{-23}$ = 1.9860*$10^{-7}$</li>
</ol>
<p>十进制转二进制</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623150050510.png"></p>
<h2 id="特殊数的表示"><a href="#特殊数的表示" class="headerlink" title="特殊数的表示"></a>特殊数的表示</h2><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/QQ%E5%9B%BE%E7%89%8720220623151811.jpg"></p>
<p>精度</p>
<ul>
<li>Precision 计算机一个字用于表示数的位数</li>
</ul>
<p>精确性</p>
<ul>
<li>Accuracy 用于衡量精确值与计算机表示之间的差异</li>
</ul>
<h1 id="程序的运行"><a href="#程序的运行" class="headerlink" title="程序的运行"></a>程序的运行</h1><p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623153109849.png" alt="image-20220623153109849"></p>
<h2 id="编译和翻译"><a href="#编译和翻译" class="headerlink" title="编译和翻译"></a>编译和翻译</h2><p>高级语言的执行有两种方式</p>
<ul>
<li>解释Interpreter<ul>
<li>例如Python、Java；解释器读入语言并执行</li>
</ul>
</li>
<li>翻译Translator<ul>
<li>将程序翻译成机器语言再执行；执行效率高、隐藏源码</li>
</ul>
</li>
</ul>
<h2 id="汇编器"><a href="#汇编器" class="headerlink" title="汇编器"></a>汇编器</h2><h3 id="1-读入并使用指示器Directive"><a href="#1-读入并使用指示器Directive" class="headerlink" title="1.读入并使用指示器Directive"></a>1.读入并使用指示器Directive</h3><blockquote>
<p>指示器产生一系列的提示信息，不产生机器指令</p>
</blockquote>
<h3 id="2-替代伪指令"><a href="#2-替代伪指令" class="headerlink" title="2.替代伪指令"></a>2.替代伪指令</h3><p>将伪指令替换为一组汇编指令</p>
<h3 id="3-生成机器语言"><a href="#3-生成机器语言" class="headerlink" title="3.生成机器语言"></a>3.生成机器语言</h3><p>分支怎么办？PC相对寻址</p>
<blockquote>
<p> 前向引用问题？分支指令引用还未遇到的标记</p>
</blockquote>
<p>使用两次扫描的方式解决问题，一次扫描记住标记位置，第二次扫描使用标记位置产生代码。</p>
<blockquote>
<p>跳转指令的问题？需要绝对地址</p>
</blockquote>
<p>产生两张表</p>
<ul>
<li>符号表<ul>
<li>我有什么</li>
</ul>
</li>
<li>重定位表<ul>
<li>我要什么</li>
</ul>
</li>
</ul>
<h3 id="4-生成目标文件"><a href="#4-生成目标文件" class="headerlink" title="4.生成目标文件"></a>4.生成目标文件</h3><h2 id="连接器"><a href="#连接器" class="headerlink" title="连接器"></a>连接器</h2><p>输入代码和信息表；输出可执行程序</p>
<p>使得多个文件的分离编译称为可能</p>
<ol>
<li>从每个.o文件取代码段放一起</li>
<li>从每个.o文件取数据段放一起，然后整体连到代码段尾部</li>
<li>检查重定向表填充绝对地址<ul>
<li>PC相对寻址 不重定位</li>
<li>绝对地址、外部引用、数据引用 重定位</li>
</ul>
</li>
</ol>
<p>动态链接库DLL</p>
<p>​    便于及时更新，且体积小</p>
<p>静态链接库lib</p>
<h2 id="装入器"><a href="#装入器" class="headerlink" title="装入器"></a>装入器</h2><p>操作系统的一部分，输入执行代码(.out).exe，输出正在运行的程序</p>
<h1 id="电路基础和基本计算模块"><a href="#电路基础和基本计算模块" class="headerlink" title="电路基础和基本计算模块"></a>电路基础和基本计算模块</h1><h2 id="同步数字系统"><a href="#同步数字系统" class="headerlink" title="同步数字系统"></a>同步数字系统</h2><p>ISA(Instruction Structure Architecture,指令集结构)是软件与硬件之间的协议</p>
<ul>
<li>同步<ul>
<li>所有的操作都由一个中央时钟同步</li>
</ul>
</li>
<li>数字<ul>
<li>所有的值都用离散值来表示</li>
</ul>
</li>
</ul>
<p>晶体管的两种类型</p>
<ul>
<li>n-type<ul>
<li>有电通，无电不通</li>
</ul>
</li>
<li>p-type<ul>
<li>有电不通，无电通</li>
</ul>
</li>
</ul>
<h2 id="信号与波形"><a href="#信号与波形" class="headerlink" title="信号与波形"></a>信号与波形</h2><p>同步数字系统由两种基本电路构成</p>
<p><strong>信号正边沿触发！</strong></p>
<ul>
<li>组合逻辑电路<ul>
<li>输出是输入经过一定规则后的运算结果</li>
</ul>
</li>
<li>状态电路<ul>
<li>存储信息</li>
</ul>
</li>
</ul>
<h2 id="状态单元"><a href="#状态单元" class="headerlink" title="状态单元"></a>状态单元</h2><p>状态单元用来储存数值，控制组合逻辑块间的信息流动；如寄存器</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623204847692.png"></p>
<p>寄存器由多个翻转器（在0,1之间变换）组成，正边沿触发；reset是强制清零的信号</p>
<p>可以通过增加寄存器加快时钟频率</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623205318997.png"></p>
<p>状态变换FSM图也可以借助寄存器来实现</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623205459492.png"></p>
<h2 id="电路组合"><a href="#电路组合" class="headerlink" title="电路组合"></a>电路组合</h2><p>常见逻辑门的表示与真值表</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623205742941.png"></p>
<p>异或XOR:当有奇数个1时输出1</p>
<h3 id="布尔代数"><a href="#布尔代数" class="headerlink" title="布尔代数"></a>布尔代数</h3><p>运用布尔代数可以化简电路</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220624105533708.png" alt="运算律"></p>
<p>结合真值表可以设计电路</p>
<p>如何从真值表生成门电路呢？看下图</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220623211653780.png"></p>
<p>·是And  </p>
<p>+是Or</p>
<p>图5-25中显示的是二选一MUX；利用层次结构可用二选一的MUX组合成四选一的MUX</p>
<h3 id="设计ALU"><a href="#设计ALU" class="headerlink" title="设计ALU"></a>设计ALU</h3><p>32位加法器</p>
<p>首先画出真值表，发现有$2^{64}$个表项；太多了，我们得换个思路—-&gt;分解！</p>
<p>设计一位加法器</p>
<p>画出真值表—&gt;写出布尔表达式并化简—&gt;设计电路</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220624105748237.png"></p>
<p>把许多一位加法器连起来就可以构成多位加法器</p>
<p><font color="red">溢出？不懂</font></p>
<p>减法器实际上只需要在加法器上做一点点改进就好</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220624110436334.png"></p>
<h1 id="数据通道-控制通道"><a href="#数据通道-控制通道" class="headerlink" title="数据通道+控制通道"></a>数据通道+控制通道</h1><p>数据通道分为五步</p>
<ol>
<li>取指<ul>
<li>从内存中取出32位指令；PC=PC+4</li>
</ul>
</li>
<li>指令译码<ul>
<li>读opcode确定类型；分段；取出相关数据</li>
</ul>
</li>
<li>ALU<ul>
<li>实际计算</li>
</ul>
</li>
<li>内存访问<ul>
<li>只有lw、sw此阶段工作；利用cache加快访问</li>
</ul>
</li>
<li>写寄存器</li>
</ol>
<p>需要在脑海里能够画出下面这个完整版的数据通道</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220626122922492.png"></p>
<p>控制信号的设计，其实就是opcode与funct做and运算，得到一串二进制数，这串二进制数做or运算得到所需的信号</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220626123223021.png"></p>
<h1 id="流水线改进性能"><a href="#流水线改进性能" class="headerlink" title="流水线改进性能"></a>流水线改进性能</h1><p>延迟不变；增加吞吐量</p>
<h2 id="结构困境"><a href="#结构困境" class="headerlink" title="结构困境"></a>结构困境</h2><p>硬件不支持某些组合</p>
<ul>
<li>内存同时被访问<ul>
<li>设计两个内存：一个指令内存一个数据内存</li>
<li>建立两个一级缓存</li>
</ul>
</li>
<li>寄存器同时被读写<ul>
<li>前半段只写；后半段只读</li>
<li>构建新的reg寄存器支持同时读写</li>
</ul>
</li>
</ul>
<h2 id="控制困境"><a href="#控制困境" class="headerlink" title="控制困境"></a>控制困境</h2><p>要等分支语句的判断出来后才能进行下一步</p>
<ul>
<li>阻塞no-op消耗三个时钟周期<ul>
<li>优化1：插入特殊分支比较器，在第二阶段解码得出分支立即决策更新PC</li>
<li>优化2：重新定义分支；（无论是否分支，分支判断语句下一条总被执行，叫做分支延时槽Branch-Delay slot<ul>
<li>也就是将不被分支影响的指令放到分支语句后执行；重新排列汇编语句执行顺序</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="数据困境"><a href="#数据困境" class="headerlink" title="数据困境"></a>数据困境</h2><p>后方指令依赖前面指令的结果</p>
<ul>
<li>前馈解决<ul>
<li>添加额外硬件从ALU的计算结果中直接取出后项要用的数据</li>
<li>无法解决就阻塞+前馈<ul>
<li>硬件阻塞<ul>
<li>可以单独插入一个bubble在两阶段之间</li>
</ul>
</li>
<li>nop阻塞<ul>
<li>直接插入一个nop指令什么也不做</li>
</ul>
</li>
<li>load之后的指令叫load delay slot</li>
</ul>
</li>
</ul>
</li>
</ul>
<h1 id="Cache高速缓存"><a href="#Cache高速缓存" class="headerlink" title="Cache高速缓存"></a>Cache高速缓存</h1><p>利用时间局部性和空间局部性</p>
<p>Cache是主存的子集的一个拷贝</p>
<p>Cache与内存间传输数据的单位——块block</p>
<p><img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220626181615411.png" alt="image-20220626181615411"></p>
<p>如上图，内存地址被划分为三块<code>tag</code> <code>index  </code> <code>offset</code></p>
<p>offset长度根据（能表示一个块包含的字节数来决定的位数）</p>
<p>index长度等于（能表示（缓存大小÷一行缓存的大小）这个的位数）</p>
<p>tag = 地址位数-offset和index的位数</p>
<p>访问cache有三种情况</p>
<ol>
<li>命中</li>
<li>未命中</li>
<li>未命中且替换</li>
</ol>
<p>访问cache有这样三步</p>
<ol>
<li>看index确认cache行数</li>
<li>看tag确认是否是正确的行</li>
<li>看offset访问内容</li>
<li>如果2不满足就替换</li>
</ol>
<h2 id="内存读写"><a href="#内存读写" class="headerlink" title="内存读写"></a>内存读写</h2><p>更新内存的方法</p>
<ul>
<li><p>写内存Write Through</p>
<ul>
<li>同时写内存和cache</li>
</ul>
</li>
<li><p>写回WriteBack</p>
<ul>
<li>只写cache，替换内存中的字为dirty；当该块缓存被替换时写入内存</li>
</ul>
</li>
</ul>
<p>最小化平均访问时间AMAT（Average Memory Access Time）</p>
<p>AMAT=$HitTime+MissPenalty×MissRate$</p>
<p>块替换策略，常用LRU</p>
