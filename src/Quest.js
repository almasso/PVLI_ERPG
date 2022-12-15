import NPC from './obj/npc.js'
import { allyParty } from './fight/Party.js';
import { AllyTEST } from './obj/manin.js';

export class QuestNPC extends NPC {
    constructor(scene, x, y, imageID, npcID, dialogues, manin, quest) {
        super(scene, x, y, imageID, npcID, dialogues, manin);
        this.quest = quest;
    }

    activateQuest(){
        if(!this.quest.acquired){
            allyParty.questLog.addQuest(this.quest);
            allyParty.questLog.actualQuest = allyParty.questLog.numQuests - 1; 
            this.scene.scene.get('hud').addQuest(this.quest);
            this.scene.scene.get('hud').UpdateHUD();
            this.quest.acquired = true;   
        }
    }
    
    advanceQuest(){
        this.quest.advanceQuest(this.quest.id);
        //this.manin.questLog.CompleteQuest(this.quest.id);
        allyParty.questLog.actualQuest = allyParty.questLog.GetQuest(this.quest.id).index; 
        if(this.quest.finished){
            allyParty.questLog.CompleteQuest(this.quest.id);
        }
        this.scene.scene.get('hud').UpdateHUD();
    }
}

// this should be mostly HUD but also some management
export class QuestLog {
    constructor(){
        this.quests = [];
        this.completedQuests = [];
        this.noQuests = "No hay mision actual";
        this.numQuests = 0;
        this.numCompletedQuests = 0;
        this.actualQuest = -1;
    }

    addQuest(quest){
        console.log(this.actualQuest + "   " + this.numQuests);
        this.quests.push(quest);
        this.numQuests++;
        this.actualQuest = this.numQuests - 1; 
        // añadir todos los textos y eso
    }

    advanceQuest(id){
        console.log(this.actualQuest + "   " + this.numQuests);
        let quest = this.GetQuest(id);
        quest.quest.actualObjectiveCompleted = true;
        this.actualQuest = quest.index;
        console.log(this.actualQuest + "   " + this.numQuests);
    }
    
    CompleteQuest(id){
        console.log(this.actualQuest + "   " + this.numQuests);
        this.numCompletedQuests++;
        this.numQuests--;
        let quest = this.GetQuest(id);
        this.quests.splice(quest.index, 1);
        console.log(this.quests);
        this.completedQuests[this.numCompletedQuests - 1] = quest.quest;
        if(this.actualQuest === quest.index){
            this.actualQuest = 0;
            if(this.quests[this.actualQuest] === undefined) {
                this.actualQuest = -1;
            }
        }
        console.log(this.actualQuest + "   " + this.numQuests);
    }


    ShowQuest(){
        if(this.actualQuest !== -1){
            return {name: this.quests[this.actualQuest].name,
                text: this.quests[this.actualQuest].objectives[this.quests[this.actualQuest].stage], 
                yellowColor: this.quests[this.actualQuest].actualObjectiveCompleted};
        }
        else{
            return {text: this.noQuests, yellowColor: false};
        }
    }

    GetQuest(id){
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i].id == id){
                return {quest: this.quests[i], index: i};
            }
        }
    }
}

export class Quest {
    constructor(stages, id, name, objectives, npcName, imgID, desc){
        this.stages = stages;
        this.stage = 0;
        this.id = id;
        this.name = name;
        this.objectives = objectives;
        this.actualObjectiveCompleted = false;
        this.finished = false;
        this.acquired = false;
        this.img = imgID;
        this.npcName = npcName;
        this.description = desc;
    }

    advanceQuest(){
        if(!this.finished){
            this.stage++;
            if(this.stage >= this.stages) this.finished = true;
            this.actualObjectiveCompleted = false;
        }
    }
}