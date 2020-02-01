<style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      z-index: 10;
    }
  
    .modal {
      position: fixed;
      top: 10vh;
      left: 10%;
      width: 80%;
      max-height: 80vh;
      background: white;
      border-radius: 5px;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      overflow: scroll;
    }

    h1, h2, h3, h4 {
      -webkit-transition: -webkit-transform 0.6s ease-in-out;
      transition: transform 0.6s ease-in-out;
    }

    a:target {
      animation: moveDown 0.6s ease-in-out 0.2s backwards;
      background: rgb( 255, 90, 180);
    }

    @keyframes moveDown {
      0% {
        transform: translateY(-40px);
        opacity: 0;
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }

    .content {
      padding: 1rem;
    }
  
    footer {
      padding: 1rem;
    }
  
    @media (min-width: 768px) {
      .modal {
        width: 40rem;
        left: calc(50% - 20rem);
      }
    }
  
    header {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      border-bottom: 1px solid #ccc;
    }
    button {
        color: #561eff;
        box-shadow: 6px 5px 10px slategrey, -5px -2px 10px slategrey;
        text-shadow: -2px 1px 5px darkviolet;
        border-radius: 70px;
        border: 2px solid darkolivegreen;
        cursor: pointer;
    }
</style>

  <script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";

    const dispatch = createEventDispatcher();
  </script>

  <div
    transition:fade
    class="modal-backdrop"
    on:click={() => dispatch('closemodal')}
  />
  <div class="modal" transition:fly={{ y: 300 }}>
    <header>
      <slot name="header" />
    </header>
    <div class="content">
      <slot />
    </div>
    <footer>
      <slot name="footer">
        <button on:click={() => dispatch('closemodal')}>Close</button>
      </slot>
    </footer>
  </div>
