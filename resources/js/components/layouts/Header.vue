<template>
    <header>
        <div class="logo"><a href="/"></a></div>

        <div class="user">
            <ul>
                <li>
                    <a href="javascript:;">
                        <span>
                            <i class="fa fa-user"></i>
                            <b>{{ user.name }} {{ user.surname }}</b>
                        </span>
                    </a>
                </li>
                <li class="big-icon" title="App Info" style="padding: 0px;">
                    <router-link style="padding: 0 10px;" to="/info">
                        <i class="fa fa-info"></i>
                    </router-link>
                </li>
                <li class="big-icon" title="Logout" style="padding: 0px 5px;">
                    <a href="/logout">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>
<script setup>
const user = userInfo;
</script>
