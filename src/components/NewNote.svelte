<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-awesome";
  import { plusCircle } from "svelte-awesome/icons";

  const dispatch = createEventDispatcher();
</script>
<style>
    #new-note {
        display: flex;
        justify-content: flex-start;
        width: 90%;
        max-width: 600px;
        max-height: 25vh;
        padding: 4px 0.5%;
    }

    h2 {
        margin: 0px;
        color: coral;
        text-shadow: -3px 2px royalblue;
        font-family: Verdana;
        font-size: 2em;
    }

    #plus-circle {
        color: #92D788;
        margin-left: auto;
        cursor: pointer;
    }
    #plus-circle:hover {
        color: #60be52;
        margin-left: auto;
        cursor: pointer;
    }
</style>
<div id="new-note">
    <h2>New Note</h2>
    <span id="plus-circle" title="New Note" on:click={() => (dispatch("addnote"))}>
        <Icon data="{plusCircle}" scale="2.5" label="New Note" />
    </span>
</div>