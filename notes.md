##notes on github.

##questions to ask the TA.
Can you demonstrate what it looks like to need to merge and then, how to do it exactly.

## HTML/ Hypertext markup language
- Every element in html has a tag that represents the element.
- Every Html element also has attributes.
- **Attributes?** Describe the specific details of the element. Examples:
  - id : Which is an attribute that gives a unique id to the element to distinguish it from other elements.
  - class : this attribute classifies the element into a named group of elements.
- Attributes are written inside element tag with a name followed by an optional value. EX:
```
<p id="hello" class="greeting">Hello world</p>
```
- **Hyperlinks:** A hyperlink in html is represented by an anchor (a) element that has an attribute containing the address of the hyperlink reference (href). Example:
```
    -<a href="https://byu.edu">Go to the Y</a>
```
-**NOTE:** By default a web server will display the HTML file named **index.html**. So it is very common to name the main HTML file for your web application **index.html**.
-**Images:** When putting an image in html, you don't need and end </img>, you just need the attributes src= "URL" and alt = "name your image"
  - src - Specifies the path to the image
  - alt - Specifies an alternate text for the image (just so you know what the image is from code}
```
<img src="url" alt="alternatetext">
```
- But you can also use width and height attributes or just style attribute to edit it.
```
<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
```
or
```
<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">
```
-**TABLES:** This is how you do it:
```
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
```

### HTML Glossary:
|Element | Meaning     |
|------|-------------|
|html| top-level page structure, or page container|
|head| contains the metadata about the page and page title, or header information|
|title| title of page (found in title bar)|
|body| define the main content structure of a web page, including text, images, links, and other HTML elements|
|main| specifies the main content of a document|
|h1 - h6| H1 tags are used to indicate the primary topic of your webpage to visitors and search engines. HTML heading tags, H1 to H6, are used to format the text on a page with H1 defining the most important and visually prominent heading on the page.|
