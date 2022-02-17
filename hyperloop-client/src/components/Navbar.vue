<template>
    <nav>
        <v-navigation-drawer dark fixed v-model="drawer" v-if="showNavbar" app color="primary">
            <v-col justify-space-between fill-height>
                <v-list dark>
                    <v-img class="ml-3" :src="logourl" max-height="70" width="80%"></v-img>
                    <template v-for="(item, i) in items">
                        <v-list-group no-action link :prepend-icon="item.icon" v-if="'nodes' in item" :key="i" active-class="yellow--text">
                        <template v-slot:activator>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </template>
                        <v-list-item
                        v-for="(nodeitem, n) in item.nodes"
                        :key="n"
                        @click="$store.commit('openItem', {type: 'loop', id: nodeitem.id})"
                        >
                            <v-list-item-title>{{ nodeitem.title }}</v-list-item-title>
                        </v-list-item>
                        </v-list-group>
                        <v-subheader v-else :key="i">{{item.title}}</v-subheader>
                    </template>
                </v-list>
            </v-col> 
        </v-navigation-drawer>
        <v-app-bar app dense dark color="secondary" v-if="showNavbar">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="mr-4" :color="toolbarColor" style="minWidth: 100px;">HYPERLOOP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text icon><v-icon>add</v-icon></v-btn>
            <span style="width: 300px;"><v-text-field solo v-model="search" label="Search for tasks..." append-icon="search" hide-details @click:append="search()"></v-text-field></span>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>{{userData.displayName}}</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click.stop="logout()">
                        <v-list-item-title><v-icon left>logout</v-icon> Sign Out</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </nav>
</template>

<script>

export default {
    name: "Navbar",
    data() {
        
    },
    computed: {
        loops() {
            return this.$store.state.loops;
        },
        eventLoops() {
            return this.loops.filter(l => l.type == 'event');
        },
        personLoops() {
            return this.loops.filter(l => l.type == 'person');
        },
        reviewLoops() {
            return this.loops.filter(l => l.type == 'review');
        },
        placeLoops() {
            return this.loops.filter(l => l.type == 'place');
        },
        projectLoops() {
            return this.loops.filter(l => l.type == 'project');
        },
        userData() {
            return this.$store.state.userData;
        },
        showNavbar() {
            return this.$store.state.showNavbar;
        },
        items() {
            var _this = this;
            var returnArray = [
                { icon: '', title: 'Loops', linkpath: '' }
            ];

            var placeloopsmenu = { icon: 'apartment', title: 'Places', nodes: [] }
            this.placeLoops.forEach(function(loop) {
                placeloopsmenu.nodes.push({ title: '@' + loop.name, itemtype: 'loop', itemid: loop.id });
            });
            returnArray.push(placeloopsmenu);

            var personloopsmenu = { icon: 'group', title: 'People', nodes: [] }
            this.personLoops.forEach(function(loop) {
                personloopsmenu.nodes.push({ title: '?' + loop.name, itemtype: 'loop', itemid: loop.id });
            });
            returnArray.push(personloopsmenu);

            var eventloopsmenu = { icon: 'event', title: 'Events', nodes: [] }
            this.eventLoops.forEach(function(loop) {
                eventloopsmenu.nodes.push({ title: '+' + loop.name, itemtype: 'loop', itemid: loop.id });
            });
            returnArray.push(eventloopsmenu);

            var projectloopsmenu = { icon: 'checklist', title: 'Projects', nodes: [] }
            this.projectLoops.forEach(function(loop) {
                projectloopsmenu.nodes.push({ title: '*' + loop.name, itemtype: 'loop', itemid: loop.id });
            });
            returnArray.push(projectloopsmenu);

            var reviewloopsmenu = { icon: 'history', title: 'Reviews', nodes: [] }
            this.reviewLoops.forEach(function(loop) {
                reviewloopsmenu.nodes.push({ title: '^' + loop.name, itemtype: 'loop', itemid: loop.id });
            });
            returnArray.push(reviewloopsmenu);

            return returnArray;
        },
    }
}
</script>
