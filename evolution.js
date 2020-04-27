var gauss = require('gaussian');

function Toolbox() {
    this.genIndv = function() {};
    this.getFitness = function() {};
    this.mutate = function() {};
    this.goalFitness = Toolbox.fitnessMax;
    this.mutAmount = function(){};
    this.len = 0;
};

Toolbox.fitnessMax = 1;
Toolbox.fitnessMin = -1;

function GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction, verbose = false) {

    checkConstructorVars(toolbox, popSize, mutProb, breedFunction);

    function checkConstructorVars(toolbox, popsize, mutProb, breedFunction) {
        if(toolbox === undefined) {
            throw 'Toolbox must be defined';
        }

        if(popSize === undefined) {
            throw 'Population size must be defined';
        }

        if (popSize <= 2) {
            throw 'Population size must be greater than 2. Current size: ' + popSize;
        }

        if(mutProb === undefined) {
            throw 'Mutability probability must be defined';
        }

        if(breedFunction === undefined) {
            throw 'Breed function must be defined';
        }
    };

    

    this.evolve = function(generations) {
        let mutationInd = toolbox.mutAmount;
        let population = this.generatePopulation(popSize, toolbox.len, mutationInd);
        population = this.getFitness(population, mutationInd);
        let summ=0;

        for(let i =0; i < popSize; i++){
             console.log("INDIVID "+ population[i].individual);
             console.log("FITNESS IS "+population[i].fitness);
            console.log("MUTATED INDEDX " +population[i].mutatedIndex);
            summ += population[i].fitness; 
        }
       console.log("AAVARAGE: "+ summ/popSize);
        console.log("NEUTRAL "+mutationInd.neutral);
        console.log("PATOHENIC "+mutationInd.patohenic);
        

        

        for (var i = 0; i < generations; i++) {
//            population = this.getFitness(population, toolbox.getFitness);
//            population = this.sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);

            if (verbose) printUpdate(population, i);
            cleanedPopulation = getCleanedPopulation(population);
            console.log("CLEANED POPULATION LENGTH "+cleanedPopulation.length);
            population = breed(cleanedPopulation, toolbox.mutate, mutProb, breedFunction, mutationInd, population.length);
            console.log("BREEDED POPULATION LENGTH "+population.length);
            let wildType = getWildType(population);
            console.log("WILD TYPE IS: "+wildType);
        }
//        population = this.sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);
//        if (verbose) printUpdate(population, generations);

        let results = getResults(population, generations);
        return results;
    };


    // Generate a population with the given individual 
    // generation strategy and population size
    this.generatePopulation = function(popSize, l, mutationInd) {
        let pop = [];
        for (var i = 0; i < popSize; i++) {
            let generInd = generateIndividual(l, 1, mutationInd);
            
            let indv = { individual: generInd.indiv,
                       mutatedIndex: generInd.mutatedInd}
            pop.push(indv);
        }
        return pop;
    };
//d----------------------------------------------------------------------HERE-----------------------------------
    
    this.getFitness = function(population, mutationInd) {
        for (var i = 0; i < population.length; i++){
            let indv = population[i];
            indv.fitness = checkMutation(indv, mutationInd).fitness;
            
            population[i] = indv;
        }
        return population;
    }
    
    
    // Sort the population array
    this.sortByFitness = function(population, getFitness, goalFitness) {
        population.sort(function(a, b) {
            return (b.fitness - a.fitness) * goalFitness;
        });
        return population;
    };
    
    function getCleanedPopulation(population){
        let res = population.filter(elem =>elem.fitness != 0.1);
        return res;
    }
    // breed population and apply mutation if probability met
    function breed(population, mutate, mutProb, breedFunction, mutationInd, populLength) {

        // Select best individuals and remove bottom half of population
//        let breeders = Math.round(population.length / 2);
         let newPopulation = [];

        // Select parents
        while (newPopulation.length != populLength) {
            let parentAIndex = Math.floor(Math.random() * population.length);
            let parentBIndex = Math.floor(Math.random() * population.length);

            while (parentAIndex == parentBIndex) {
                parentBIndex = Math.floor(Math.random() * population.length);
            }

//            let parentA = population[parentAIndex].individual;
//            let parentB = population[parentBIndex].individual;
//            
//            let parentAfit = population[parentAIndex].fitness;
//            let parentBfit = population[parentBIndex].fitness;
//            console.log(parentBfit+ "fitness!!!!!");
            let parentA = population[parentAIndex];
            let parentB = population[parentBIndex];
            // Create newborn
            let newborn = breedFunction(parentA, parentB);

            // Mutate newborn & change fitness value of individual
                newborn = mutate(newborn, mutProb);
                //now newborn is:
                //[object Object] {
                //  fitness: 10,
                //  individual: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                //  mutatedIndex: 10
                //}
//check if mutation is neutral etc.
            newborn = checkMutation(newborn, mutationInd);
            
//            console.log(newborn);
            newPopulation.push({ individual: newborn.individual, fitness: newborn.fitness });
        }
        return newPopulation;
    };
    
    
    //returns Obj{1:3, 2:2,....}
function getHemmingDimmensionToZero(population){
  return population
          .map(element => element.individual.filter(value => value == 1).length)
          .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {}); 
}
    
    
//returns Obj{1:3, 2:2,....}
function getHemmingDimmensionToWildType(population, wildType) {
    let result = {};

    function checkInResult(count) {
        if (result.hasOwnProperty(count))
            return true;
        return false;
    }

    function computeDimmension(x, y) {
        let count = 0;
        x.individual.forEach(function(element, index) {
            if (element != y[index])
                count++;
        })
        return count;
    }
    for (let i = 0; i < population.length; i++) {
        let hemming = computeDimmension(population[i], wildType);
        if (checkInResult(hemming))
            result[hemming]++;
        else
            result[hemming] = 1;
    }
    return result;
}
    
function getAmountOfPairedHemmingtonDistances(population){
  let result = {};
  function checkInResult(count){
    if (result.hasOwnProperty(count))
      return true;
    return false;
  }
  function computeDimmension(x, y){
    let count = 0;
    x.individual.forEach(function(element,index){
      if (element != y.individual[index])
        count++;
    })
    return count;
  }
  for(let i = 0; i < population.length; i++){
    for(let k = i+1; k < population.length; k++){
      let hemming = computeDimmension(population[i], population[k]);
  
      if (checkInResult(hemming))
        result[hemming]++;
      else
        result[hemming] = 1;
      }
  }
  return result;
}

// (sumOfAllIndiv, isType1, mutAmount) for TYPE2
// (sumOfAllIndiv, isType1) for TYPE1
//It is used for Polymorph genes in population and in Wild Type too!
function getPolymorphPercentage(...args) {
    let res = 0;
    let sumOfAllIndiv = arguments[0];
    let count = 0;
    if (arguments[1]) {
        sumOfAllIndiv.forEach(function(n) {
            n > 0 ? count++ : count;
            return count;
        });
    } else {
        let neutral = arguments[2].neutral;
        neutral.forEach(function(n) {
            sumOfAllIndiv[n] == 1 ? count++ : count;
        });
    }
    res = (100 * count) / sumOfAllIndiv.length;
    return res;

}    
    

function getWildType(population){
    let indivLength = population[0].individual.length;
    var initialValue = Array(indivLength).fill(0);

    const reducer = function addition(accumulator, obj){
      for(let i = 0; i < accumulator.length; i++){
        accumulator[i] += obj.individual[i];
      }
      return accumulator;
    }
    var allIndivSum = population.reduce(reducer, initialValue);
    let half = (population.length/2);
    let wildType = allIndivSum.map(function(n){
      n >(half) ? n = 1 : n = 0;
      return n;
    })
return wildType;
}

    function getResults(population, generations) {
        let results = {
            generations: generations,
            population: []
        };
        for (var i = 0; i < population.length; i++) {
            let indv = population[i];
            results.population.push(indv);
        }
        return results;
    };

    function printUpdate(population, generation) {
        let fittestScore = population[0].fitness;
        let sum = 0;
        for (var i = 0; i < population.length; i++) {
            sum += population[i].fitness;
        }
        let average = sum / population.length;
        console.log("Generation:", generation, "Fittest:", fittestScore, "Average:", average);
    };
};

function Algorithms() {};

Algorithms.crossBreed = function(parentA, parentB) {
    // Select cutOff point and create newborn
    let cutOff = Math.floor(Math.random() * parentA.length);
    let newborn = parentA.slice(0, cutOff + 1);
    let parentBChrom = parentB.slice(cutOff + 1, parentB.length);

    for (var i = 0; i < parentBChrom.length; i++) {
        newborn.push(parentBChrom[i]);
    }
//    console.log(newborn);
    return newborn;
}

function tournament2 (parentA, parentB){
    let newborn = 0;
    parentA.fitness > parentB.fitness ? newborn = parentA : newborn = parentB;
    return newborn;
}


//function fitnessDefining(){
//    
//}


//ME CODE


// Create parameters
var popSize = 10;
var mutProb = 0.00006116085;
var generations = 10;
var breedFunction = tournament2;
var l = 200; 


var toolbox = new Toolbox();
toolbox.genIndv = generateIndividual;
toolbox.getFitness = checkMutation;
toolbox.goalFitness = Toolbox.fitnessMax;
toolbox.mutate = mutate;
toolbox.mutAmount = mutationAmount(l);
toolbox.len = l;


//-----------------------------------


function mutationAmount(l) {

    let result = {
        neutral: [],
        patohenic: [],
		lethal:[]
    };
    let amount = 0.053 * l;
    for (let i = 0; i < amount; i++) {
        result.neutral.push(i);
    }
    let amount2 = 0.3577 * l;
    let limit = amount2 + result.neutral.length;
    while (result.neutral.length < limit) {
        randNum = Math.floor(Math.random() * l);
        if (result.neutral.indexOf(randNum) == -1) {
            result.neutral.push(randNum);
        }
    }

    let patohenicAmount = 0.0232 * l;
    let limit2 = limit + patohenicAmount;
    while (result.patohenic.length < patohenicAmount) {
        randNum = Math.floor(Math.random() * l);
        if (result.neutral.indexOf(randNum) == -1 && result.patohenic.indexOf(randNum) == -1) {
            result.patohenic.push(randNum);
        }
    }
	
	const rest = result.neutral.concat(result.patohenic);
	const indxs = [...Array(l).keys()];
	
	result.lethal = indxs.filter(element => !rest.includes(element))
	
    return result;
};

function checkMutation(indv, mutationInd){
    if(indv.mutatedIndex.length != 0){
       let newIndw = indv.mutatedIndex;
      let counter = newIndw.length;
  let neutral = newIndw.filter(function(v, index){
    let b = mutationInd.neutral.some(function(v2){
      return v == v2;
    })
    if(b){
        counter--;
       }
    return b;
  }); 
  let patohenic = newIndw.filter(function(v, index){
    let a = mutationInd.patohenic.some(function(v2){
      return v == v2;
    })
    if(a){
        counter--;
       }
    return a;
  }); 
  if(counter > 0){
    indv.fitness = 0.1 ;
  }else if(patohenic.length >0){
    indv.fitness = (indv.individual.length - (10 * patohenic.length));
  }else{
    indv.fitness = indv.individual.length;
  }
    }else{
        indv.fitness = indv.individual.length;
    }
  return indv;
    }
    
    
//    
//    
//     if(mutationInd.neutral.includes(newborn.mutatedIndex)){
//                newborn.fitness = newborn.fitness;
//            }else if(mutationInd.patohenic.includes(newborn.mutatedIndex)){
//                newborn.fitness = newborn.fitness - (newborn.individual.length - 10);
//            }else{
//                newborn.fitness = 0.1;
//            }
//                console.log(newborn);
//}


function generateIndividual(length, sigma, mutationIndexes){
	
	let individual = {
		indiv : [],
		mutatedInd : [],
	}

	const round = function(element){
		if (element > sigma)
			return 1;
		return 0;
	}
	
	const gaussian = gauss(0, sigma);
	const distribution = gaussian.random(length);
	
	individual.indiv = distribution
						.map(round);
	
	mutationIndexes.lethal
				.forEach(indx => individual.indiv[indx] = 0)
		 
	mutationIndexes.patohenic
				.forEach(function(element){
					if(individual.indiv[element] == 1)
						individual.mutatedInd.push(element)})
					
	return individual;
}

function getFitness(indv) {
	let fitness = 0;
	for(var i = 0; i < indv.length; i++) {
		fitness += indv[i] == 1 ? 0 : 1;
	}
	return fitness;
}

function mutate(indv, mutProb) {
    let result = {
        mutatedIndex: [],
        individual: indv.individual,
        fitness: indv.fitness
    }
    result.individual.forEach(function(n, index){
        if(Math.random() <= mutProb){
            n == 1? result.individual[index]= 0 : result.individual[index]= 1 && result.mutatedIndex.push(index);
            }
    });
  return result;
}




// Create genetic algorithm and evolve individuals
var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction, true);
console.log("Simple Array Example:", gen.evolve(generations));


