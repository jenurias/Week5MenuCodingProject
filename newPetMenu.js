class Pet {
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
    }

    describe() {
        return `${this.name} was born on ${this.birthday}.`;
    }
}

class Animal {
    constructor(name) {
        this.name = name;
        this.pets = [];
    }

    addPet(pet) {
        if (pet instanceof Pet) {
            this.pets.push(pet);
        } else {
            throw new Error(`You can only add an instance of Pet. Argument is not a pet: ${pet}`);
        }
    }

    describe() {
        return `There are ${this.pets.length} animals that are ${this.name}.`;
    }
}

class Menu {
    constructor() {
        this.animals = [];
        this.selectedAnimal = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createAnimal();
                    break;
                case '2':
                    this.viewAnimal();
                    break;
                case '3':
                    this.deleteAnimal();
                    break;
                case '4':
                    this.displayAnimals();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert ('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new animal
            2) View animal
            3) Delete animal
            4) Display all animals
        `);
    }

    showPetMenuOptions(petInfo) {
        return prompt(`
            0) Back
            1) Create pet 
            2) Delete pet
            --------------------------
            ${petInfo}
        `);
    }

    displayAnimals() {
        let animalString = '';
        for (let i = 0; i < this.animals.length; i++) {
            animalString += i +') ' + this.animals[i].name + '\n';
        }
        alert(animalString); 
    }

    createAnimal() {
        let name = prompt('Enter type of animal:'); 
        this.animals.push(new Animal(name));
    }

    viewAnimal() {
        let index = prompt('Enter the index of the animal you wish to view:');
        if (index > -1 && index < this.animals.length) {
            this.selectedAnimal = this.animals[index];
            let description = 'Animal Type: ' + this.selectedAnimal.name + '\n';
            
            for (let i = 0; i < this.selectedAnimal.pets.length; i++) {
                description += i + ') ' + this.selectedAnimal.pets[i].name 
                + ' - ' + this.selectedAnimal.pets[i].birthday + '\n';
            }

            let selection = this.showPetMenuOptions(description); 
            switch (selection) {
                case '1':
                    this.createPet();
                    break;
                case '2':
                    this.deletePet();
            }
        }
    }

    deleteAnimal() {
        let index = prompt('Enter the index of the Aminal you wish to delete:');
        if(index > -1 && index < this.animals.length) {
            this.animals.splice(index, 1);
        }
    }

    createPet() {
        let name = prompt('Enter name for new Pet:');
        let birthday = prompt('Enter birthday of your pet:');
        this.selectedAnimal.pets.push(new Pet(name, birthday));
    }

    deletePet() {
        let index = prompt('Enter the index of the pet you wish to delete:');
        if(index > -1 && index < this.selectedAnimal.pets.length) {
            this.selectedAnimal.pets.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start(); 