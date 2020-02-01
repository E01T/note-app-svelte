<style>
  #markup-editor {
    border: 1px solid lightskyblue;
    border-radius: 5px;
    width: 90%;
    max-width: 600px;
    min-height: 400px;
    max-height: 85vh;
    padding: 1% 2%;
    box-sizing: border-box;
    margin-bottom: 1%;
    font-family: 'Courier New';
  }
</style>
<script>
  import { onMount } from "svelte";
  import MarkupParser from "./MarkupParser.js";
  import OptionsBar from "./OptionsBar.svelte";
  import { setNote } from "../database.js";
  import { selectText } from "../utilities.js";

  export let note = {};
  let contentEditable = null;

  let showInfo = false;
  let markupText = "";
  let parsedHtml = "";
  let markupEditor; // bind to "this" object
  let noteId = null;
  let text = null;
  let time = null;

  onMount(() => {
    if (Object.keys(note).length) {
      noteId = note.id;
      text = note.text;
      time = note.createdAt;
      markupEditor.innerHTML = text; // it needs to be into the onMount()
    }
  });

  function setEditor() {
    // replaceAll because the html comment(s) appear (Markup parser side effect)
    // and trim to trim the empty space
    markupEditor.innerText = htmlToMarkup(text).replace(/<!-- -->/g, "").trim();
    selectText(markupEditor);
  }

  function editNote(evt) {
    contentEditable = true;
    setEditor();
  }

  function getMarkup(evt) {
    markupText = evt.target.innerText;
    parsedHtml = markupToHtml(markupText); // this will be used bellow (on:blur)
  }

  function handleBlur() {
    contentEditable = false;
    text = parsedHtml ? parsedHtml : text;
    text = text.replace("<!-- -->", "").trim();
    const newObj = { text, createdAt: time };
    setNote(noteId, newObj);
    markupEditor.innerHTML = markupToHtml(text);
    // contentEditable = false;
  }

  function markupToHtml(markupText) {
    return MarkupParser.makeHtml(markupText);
  }

  function htmlToMarkup(html) {
    return MarkupParser.makeMarkdown(html);
  }
</script>

<OptionsBar
  {noteId}
  {time}
  bind:isEdited={contentEditable}
  bind:showModal={showInfo}
  on:closemodal={evt => (showInfo = false)}
  on:info={evt => (showInfo = true)}
  on:remove
></OptionsBar>
<div
  id="markup-editor"
  bind:this="{markupEditor}"
  on:focus="{editNote}"
  on:blur="{handleBlur}"
  on:keyup="{getMarkup}"
  contentEditable="true"
></div>
