<style>
  #options-bar {
    display: flex;
    background-color: lightgray;
    width: 90%;
    max-width: 600px;
    /* height: 25px; */
    max-height: 25vh;
    padding: 4px 0.5%;
    box-shadow: 10px 5px 7px grey, -8px -2px 7px lightgray;
    border-radius: 3px;
    box-sizing: border-box;
  }
  div :global(.trash) {
    padding: 0 1%;
    color: #ff381e;
    cursor: pointer;
  }

  .trash:hover {
    color: #e65b49;
  }

  div :global(.info) {
    color: #561eff;
    cursor: pointer;
    padding: 0 1%;
  }

  .info:hover {
    color: #7049e6;
  }

  div :global(.edit) {
    margin-left: auto;
    color:#ffa91e;
    /* cursor: pointer; */
  }

  div :global(.edited) {
    color: #92D788;
  }

  div :global(.time) {
    color:#1e90ff;
    font-size: 0.9em;
    text-align: left;
    padding: 0 5px;
  }
  div :global(.icon-wrap) {
    display: flex;
    align-items: center;
  }
  h1 {
      padding: 1rem;
      margin: 0;
      border-bottom: 1px solid #ccc;
      font-family: "Roboto Slab", sans-serif;
      text-align: center;
      line-height: 1.2;
    }
    @media all and (max-width: 400px) {
        h1 {
            letter-spacing: 10px;
        }
    }
</style>
<script>
  import { createEventDispatcher } from "svelte";
  import Icon from 'svelte-awesome';
  import { trash, edit, clockO, info } from 'svelte-awesome/icons';
  import Modal from "./Modal.svelte"
  import { markupCheatSheet } from "../markupCheatSheat.js";

  const dispatch = createEventDispatcher();

  // this should be created only once and stored with the rest of the data
  export let time = "";
  export let isEdited = false;
  let blured;

  export let showModal = false; // prop
  export let noteId = null;

  function editNote() {
    // isEdited = !isEdited;
    dispatch("edit"); // , { isEditable: isEdited }
  }
  function remove() {
    dispatch("remove", noteId);
  }
  function markupInfo(evt) {
      dispatch("info");
  }
</script>
{#if showModal}
<Modal on:closemodal>
    <h1 slot="header">Markup CheatSheet</h1>
    {@html markupCheatSheet}
</Modal>
{:else}
    <div id="options-bar">
        <div class="icon-wrap">
            <span class="time" title="Time">
                <Icon data="{clockO}" scale="1.5" label="created at {time}" />
            </span>
            <span class="time"> Create at: {time}</span>
        </div>
        <span class="edit" class:edited="{isEdited}" on:click="{editNote}" title="Edit mode">
            <Icon data="{edit}" scale="1.5" label="edit note"/>
        </span>
        <span class="trash" on:click="{remove}" title="Delete">
        <Icon  data="{trash}" scale="1.4" label="remove note" />
        </span>
        <span class="info" on:click="{markupInfo}" title="Info">
            <Icon  data="{info}" scale="1.5" label="markup cheatsheet" />
        </span>
    </div>
{/if}
