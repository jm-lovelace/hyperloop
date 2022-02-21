<template>
    <v-card>
        <v-app-bar dense flat>
            <v-toolbar-title v-if="!editing">{{item.data.title}}</v-toolbar-title>
            <v-toolbar-title v-else><v-text-field v-model="editingTitle" label="Title"></v-text-field>
            <v-spacer></v-spacer>
            <template v-if="!editing">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="editing=true" text icon v-bind="attrs" v-on="on"><v-icon>edit</v-icon></v-btn>  
                    </template>
                    <span>Edit Item</span>
                </v-tooltip>  
                <v-tooltip top v-if="item.type=='task' || item.type=='loop'">
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="newTask()" text icon v-bind="attrs" v-on="on"><v-icon>add_task</v-icon></v-btn>  
                    </template>
                    <span v-if="item.type=='task'">New Subtask</span>
                    <span v-else>New Task</span>
                </v-tooltip>  
                <v-tooltip top v-if="item.type=='task' || item.type=='loop'">
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="newNote()" text icon v-bind="attrs" v-on="on"><v-icon>note_add</v-icon></v-btn>  
                    </template>
                    <span>New Note</span>
                </v-tooltip> 
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="closeItem()" text icon v-bind="attrs" v-on="on"><v-icon>close</v-icon></v-btn>  
                    </template>
                    <span>Close</span>
                </v-tooltip>
            </template>  
            <template v-else>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="deleteItem()" text icon v-bind="attrs" v-on="on"><v-icon>delete</v-icon></v-btn>  
                    </template>
                    <span>Delete Item</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="discardChanges()" text icon v-bind="attrs" v-on="on"><v-icon>cancel</v-icon></v-btn>  
                    </template>
                    <span>Discard Changes</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">     
                        <v-btn @click="saveChanges()" text icon v-bind="attrs" v-on="on"><v-icon>done</v-icon></v-btn>  
                    </template>
                    <span>Save Changes</span>
                </v-tooltip>
            </template>     
        </v-app-bar>
        <v-card-text>
            <TaskCardContent :id="item.id" :data="item.data" v-if="item.type=='task'" @update="editingItem=$event" />
            <LoopCardContent :id="item.id" :data="item.data" v-if="item.type=='loop'" @update="editingItem=$event" />
            <NoteCardContent :id="item.id" :data="item.data" v-if="item.type=='note'" @update="editingItem=$event" />
        </v-card-text>
    </v-card>
</template>

<script>
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import TaskCardContent from './TaskCardContent'
import LoopCardContent from './LoopCardContent'
import NoteCardContent from './NoteCardContent'

export default {
    name: "ItemCard",
    props: ["item"],
    data() {
        return {
            editing: false,
            editingItem: null,
            editingTitle: "",
            saveLoading: false
        }
    },
    components: {
        TaskCardContent,
        LoopCardContent,
        NoteCardContent
    },
    mounted() {
        if (item.id == null)
        {
            this.editing = true;
        }

        this.editingItem = JSON.parse(JSON.stringify(this.item.data));
        this.editingTitle = this.item.data.title;
    },
    methods: {
        closeItem() {
            if (this.editing) {
               if (confirm("Are you sure you want to close? This will discard all edits."))
               {
                   this.editing = false;
                   this.$emit('close');
               }
            }
            else
            {
                this.$emit('close');
            }
        },
        saveChanges() {
            var _this = this;
            this.saveLoading = true;
            this.editingItem.title = this.editingTitle;
            var typemap = {
                loop: 'loops',
                task: 'tasks',
                note: 'notes'
            };

            if (this.item.id == null)
            {
                addDoc(collection(this.$db, typemap[this.item.type]), this.editingItem).then(function() {
                    _this.saveLoading = false;
                    _this.editing = false;
                });
            }
            else
            {
                const docRef = doc(this.$db, typemap[this.item.type], this.item.id);
                updateDoc(docRef, this.editingItem).then(function() {
                    _this.saveLoading = false;
                    _this.editing = false;
                });
            }
        },
        discardChanges() {
            if (this.editing) {
               if (confirm("Are you sure you want to discard changes?"))
               {
                   this.editing = false;
                   this.editingItem = this.item.data;
                   this.editingTitle = this.item.data.title;
               }
            }
        },
        deleteItem() {
            var _this = this;
            if (confirm("Are you sure you want to delete?"))
            {
                this.editing = false;
                this.editingItem = this.item.data;
                this.editingTitle = this.item.data.title;

                var typemap = {
                    loop: 'loops',
                    task: 'tasks',
                    note: 'notes'
                };

                deleteDoc(doc(_this.$db, typemap[_this.item.], "DC"));
            }
        }
    }
}
</script>
