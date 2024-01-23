<template>
    <div class="sidebarWrapper" :class="{ 'collapsed': !sidebarVisible }">
        <ul class="sidebar">
            <li class="sidebarSection parentActive">
                <ul class="nav">
                    <li title="Pharmacy" style="background: #3ca5a8;" v-if="user.pharmacy_role > 0">
                        <a class="sidebar-link" :href="app.esa">
                            <i class="fa fa-user-md"></i>
                            Pharmacy
                        </a>
                    </li>

                    <li title="Inventory" style="background: #006855;" v-if="user.inventory_role > 0">
                        <a class="sidebar-link" :href="app.inventory">
                            <i class="fa fa-barcode"></i>
                            Inventory
                        </a>
                    </li>

                    <li>
                        <router-link tag="li" to="/" exact class="sidebar-link">
                            <i class="fa fa-home"></i>
                            Home
                        </router-link>
                    </li>

                    <li>
                        <router-link v-if="canUserAccessModule(
                            app.active_modules,
                            app.module_roles,
                            'Import Tracking',
                            user.shipping_role_id
                        )" tag="li" to="/import-tracking" exact class="sidebar-link">
                            <i class="fa fa-upload"></i>
                            Import Tracking
                        </router-link>
                    </li>

                    <li>
                        <router-link v-if="canUserAccessModule(
                            app.active_modules,
                            app.module_roles,
                            'Shipping Reports',
                            user.shipping_role_id
                        )" tag="li" to="/reports" exact class="sidebar-link">
                            <i class="fa fa-file-text-o"></i>
                            Reports
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="collapse-menu-section">
                <a class="sidebar-link collapse-menu-link" title="Collapse menu" @click="$emit('sidebartoggle')"
                    href="javascript:;">
                    <i class="fa fa-caret-left" :class="{ 'fa-caret-right': !sidebarVisible }"></i>
                    Collapse menu
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { canUserAccessModule } from '../../helpers';
const props = defineProps(['sidebarVisible']);
const user = userInfo;
const app = appInfo;
</script>
