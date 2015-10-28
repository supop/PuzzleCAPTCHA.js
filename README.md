<h1>PuzzleCAPTCHA</h1>

<nav>
<ul>
<li><a href="#PuzzleCAPTCHA-DEMO">Demo</a></li>
<li ><a href="#PuzzleCAPTCHA-WORKS">How it works</a></li>
<li><a href="#PuzzleCAPTCHA-USE">How to use</a></li>
</ul>ch
</nav>


<a name="PuzzleCAPTCHA-DEMO"></a>
<h2>Demo</h2>

<p>Have a look at the live demo!!</p>
<a href="http://plugins.supos.com.au/PuzzleCAPTCHA/" target="_blank">http://plugins.supos.com.au/PuzzleCAPTCHA/</a>

<a name="PuzzleCAPTCHA-WORKS"></a>
<h2>How it works</h2>

<ul>
	<li>It automatically generates a very simple jigsaw kind of puzzle from any image on the web.</li>
	<li>Need to lock the form by using [disabled="true"] on the submit button.</li>
	<li>You can generate a value by Server-side Script and put into the option called [targetVal] then it will pass when the form is submitted so can double check by Server-side script.</li>
</ul>

<a name="PuzzleCAPTCHA-USE"></a>
<h2>How to use</h2>

<h3>Basic Usage</h3>
<ol>
	<li>
		Add the plugin script
		
		<pre>&lt;script src="puzzleCAPTCHA.js"&gt;&lt;/script&gt;</pre>
		
	</li>
	<li>
		Add the style
		<pre>&lt;link rel="stylesheet" href="puzzleCAPTCHA.css"&gt;</pre>
	</li>
	<li>
		Add HTML
		<pre>&lt;div id="PuzzleCaptcha"&gt;&lt;/div&gt;</pre>
	</li>
	<li>
		Call me!!
		<pre>
&lt;script&gt;
	$("#PuzzleCaptcha").PuzzleCAPTCHA({
		imageURL:'http://distilleryimage2.s3.amazonaws.com/c886e1100cbe11e3a77722000a1fbc49_5.jpg'
	});
&lt;/script&gt;
		</pre>
	</li>
</ol>

<h3>Options // <small>default value</small></h3>
<dl>
	<dt>imageURL // <small>My instagram photo ;)</small></dt>
	<dd>including [http://].</dd>

	<dt>width // <small>"auto"</small></dt>
	<dd>Use number<small>(* without "px")</small>, when you need to specify the width of the puzzle.</dd>

	<dt>height // <small>"auto"</small></dt>
	<dd>The same as [width].</dd>

	<dt>columns // <small>3</small></dt>
	<dd>Add number to divide in column.</dd>

	<dt>rows // <small>2</small></dt>
	<dd>Add number to divide in row.</dd>

	<dt>targetInput // <small>null</small></dt>
	<dd>
		Using jQuery selector - 
		<br>
		e.g) The input tag looks like:<br>
<pre>
&lt;input type="hidden" class="any-class-name-selector-for-input" name="the-name-that-you-want-to-confirm-on-server-side-script"&gt;
</pre>
		<br>
		The value could be {targetInput:".any-class-name-selector-for-input"}
	</dd>

	<dt>targetVal // <small>null</small></dt>
	<dd>The value that can be anything what you want to submit so you can confirm on submitted form.</dd>

	<dt>targetButton // <small>null</small></dt>
	<dd>
		Using jQuery selector - 
		<br>
		e.g) The button tag looks like:<br>
		<pre>&lt;button type="submit" disabled="true" class="any-class-name-selector-for-button" name="any-name"&gt;Submit!!&lt;/button&gt;</pre>
		<br>
		The value could be {targetButton:".any-class-name-selector-for-button"}

	</dd>

</dl>


<br><br><br>

<h4>*Thing to do:</h4>

<ul>
	<li>Validate the value passed when it is called.</li>
	<li>Image preloading is not clear depending on the browser.</li>
</ul>


