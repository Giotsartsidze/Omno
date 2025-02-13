<div class="side-menu">
    <div class="top-cont">
        <button>
            <img src="/O.svg" alt="icon" />
        </button>
        <button>
            <img src="/home.svg" alt="icon" />
        </button>
        <button>
            <img src="/paymants.svg" alt="icon" />
        </button>
        <button>
            <img src="/settings.svg" alt="icon" />
        </button>
        <button>
            <img src="/arrows.svg" alt="icon" />
        </button>
    </div>
    <div class="top-cont">
        <button>
            <img src="/Company.svg" alt="icon" />
        </button>
        <button>
            <img src="/bell.svg" alt="icon" />
        </button>
        <button>
            <img src="/menu.svg" alt="icon" />
        </button>
    </div>
</div>

<style>
    .side-menu {
        width: 44px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #F7F7F7;
        padding-top: 40px;
        padding-bottom: 40px;
    }
    .side-menu .top-cont button img {
        width: 24px;
        height: 24px;
    }
    .side-menu .top-cont button {
        margin-bottom: 20px;
        background: none;
    }
    .side-menu .top-cont button:first-child {
        margin-bottom: 50px;
    }
    .side-menu .top-cont {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .side-menu .top-cont:last-child {
        position: absolute;
        bottom: 40px;
        left: 0px;
        width: 100%;
    }
    .side-menu .top-cont:last-child button:first-child {
        margin-bottom: 20px;
    }
</style>