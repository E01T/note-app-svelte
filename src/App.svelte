<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    font-family: sans-serif;
  }
</style>

<script>
  import { onMount } from "svelte";
  import uuidv1 from 'uuid/v1'; // unique id
  import NewNote from "./components/NewNote.svelte";
  import MarkupEditor from "./components/MarkupEditor.svelte";
  import { getCurrentTime, sortArrayByDate } from "./utilities.js";
  import { getAllNotesR, setNote, getNote, removeNote } from "./database.js";
  import { firstNoteHtml } from "./markupCheatSheat.js";

  let notes = [];
  notes = sortArrayByDate(getAllNotesR());

  if(!notes.length)
    newNote();

  function newNote() {
    let text = "";

    if(!notes.length) { // use notes.length as above
      text = firstNoteHtml;
    }
    const uId = uuidv1();
    const newObj = {text, "createdAt":  getCurrentTime()};
    setNote(uId, newObj);
    notes = sortArrayByDate(getAllNotesR());
  }

  function deleteNote(evt) {
    const noteId = evt.detail;
    removeNote(noteId);
    notes = sortArrayByDate(getAllNotesR());
  }
</script>

<main>
  <NewNote on:addnote={newNote}/>
    {#each notes as note (note.id)}
      <MarkupEditor on:remove={deleteNote} {note}/>
    {/each}
</main>