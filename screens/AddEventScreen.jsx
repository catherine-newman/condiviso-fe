import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { UserContext } from '../contexts/User';
import { postEvent, postRecipe } from '../utils/api';

const AddEventcreen = () => {
  const { user } = useContext(UserContext);
  const [numOfGuests, setNumOfGuests] = useState(1);
    const [recipes, setRecipes] = useState([{
       _id: '',
      user_id: 'user.user_id',
      recipe_name: '',
      recipe_ingredients: '',
      recipe_content: '',
      recipe_image: '',
  }] )
  
  const [event, setEvent] = useState({
    _id: '',
    event_name: '',
    first_name: 'user.first_name',
    last_name: 'user.last_name',
    user_name: 'user.user_name',
    user_id: 'user.user_id',
    email: 'user.email',
    event_date: '',
    event_location: 'user.address',
    postcode: 'user.postcode',
    latitude: '', 
    longitude: '',
    latitude_fuzzy: '',
    longitude_fuzzy: '',
    event_city: '',
    event_description: '',
    event_duration: '',
    max_attendees: '',
    attendees: '',
    recipes:[]})
 


  const handleAddRecipe = () => {
    setRecipes([
      ...recipes,
      {
        _id: '',
        user_id: 'user.user_id',
        recipe_name: '',
        recipe_ingredients: '',
        recipe_content: '',
        recipe_ingredients_content: '',
        recipe_image: '',
      },
    ]);
  };



  const handleDeleteRecipe = (index) => {
    console.log('here')
    const updatedList = [...recipes]
    updatedList.splice(index, 1)
    setRecipes(updatedList)
    console.log(updatedList)
  };

  
  const handleSubmit = (values) => {
    postEvent(values, user)
      .then((postedEvent) => {
             const eventId = postedEvent._id;

        
        const recipePromises = values.recipes.map((recipe) =>
          postRecipe(eventId,recipe, user_id)
        );

         Promise.all(recipePromises)
          .then((postedRecipes) => {
            console.log( postedRecipes);
          })
          .catch((error) => {
            console.error( error);
          });
      })
      .catch((error) => {
        console.error( error);
      });
  };
 
 
   

  
  return (

      <SafeAreaView style={styles.container}>
                       <ScrollView style={styles.scrollView}>
  
               <View style={styles.eventHeader}>
<Text style={styles.header}>create event</Text>
</View>
 <View style={styles.eventContainer}> 
<View style={styles.event}>
              <TextInput
                style={styles.input}
                maxLength={60}
                placeholder="Event Name"
                value={event.event_name}
                onChangeText={(name) =>
                  setEvent({ ...event, event_name: name })
                }
              />
              
              <TextInput
                style={styles.input}
                placeholder="Event date and start time (e.g.1 Aug 12:30)"
                value={event.event_date}
                onChangeText={(date) =>
                  setEvent({ ...event, event_date: date })
                }
                
                  // onBlur={() => {
                  //   const formattedDate = formatDate(values.event_date);
                  //   if (!formattedDate) {
                  //     alert('Please enter a valid date and time.');
                  //   }
                  // }}
                
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Event description"
                value={event.event_description}
                onChangeText={(description) =>
                  setEvent({ ...event, event_description: description })
                }
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Event duration (e.g. 4 hours)"
                value={event.event_duration}
                onChangeText={(duration) =>
                  setEvent({ ...event, event_duration: duration })
                }
              />
              <View style={styles.counterContainer}>
                <Text style={styles.label}>Max number of guests</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setNumOfGuests(Math.max(numOfGuests - 1, 1))}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{numOfGuests}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setNumOfGuests(numOfGuests + 1)}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
                 
              {recipes.map((recipe, index) => (
  <View key={index} style={styles.recipe}>
    <View style={styles.recipeContainer}>
    <TextInput
      style={styles.inputRecipe}
      placeholder={`Recipe Name`}
      value={recipe.recipe_name}
      onChangeText={(name) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = { ...recipe, recipe_name: name };
        setRecipes(updatedRecipes);
      }}
    />
    <TextInput
      style={styles.inputRecipe}
      placeholder={`Recipe Ingredients`}
      value={recipe.recipe_ingredients}
      onChangeText={(ingredients) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = { ...recipe, recipe_ingredients: ingredients };
        setRecipes(updatedRecipes);
      }}
      multiline
    />
    <TextInput
      style={styles.inputRecipe}
      placeholder={`Recipe Content`}
      value={recipe.recipe_content}
      onChangeText={(content) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = { ...recipe, recipe_content: content };
        setRecipes(updatedRecipes);
      }}
      multiline
    />
    <TextInput
      style={styles.inputRecipe}
      placeholder={`Recipe image`}
      value={recipe.recipe_image}
      onChangeText={(image) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = { ...recipe, recipe_image: image };
        setRecipes(updatedRecipes);
      }}
    />

        <TouchableOpacity onPress={handleDeleteRecipe(index)}>
        <Text style={styles.deleteRecipeButton}>Delete</Text>
      </TouchableOpacity>
  </View>
</View>
))}
                <TouchableOpacity style={styles.addButton}
                 onPress={handleAddRecipe}>
                   <Text style={styles.addRecipeButtonText}>Add another recipe</Text>
                 </TouchableOpacity>
   
         
                 </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Post Event</Text>
              </TouchableOpacity>
        
          </ScrollView>
                </SafeAreaView>
      )
    }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  
  },
  eventContainer: {
    borderColor: '#e47a2e',
      // padding:10, 
      

  },
  event: {
   padding: 15
  },
  eventHeader: {
    alignItems: "start",
    
      justifyContent: "center",
        padding: 30,
      justifyContent: "start",
    backgroundColor: "#e47a2e",

  },
  header: {
    fontFamily: "Jost_600SemiBold",
    color: 'white',
    fontSize: 20,


  },
  scrollView: {
    flex: 1,
  },
  input: {

    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    padding:20,
    marginBottom: 18,
    marginTop: 18,
    fontSize: 17,
    fontFamily: "Jost_600SemiBold",
     
  },
  inputRecipe: {
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    padding:20,
    marginBottom: 14,
    marginTop: 14,
    fontSize: 17,
    fontFamily: "Jost_600SemiBold",
  },


  textArea: {
     
    height: 100,
    textAlignVertical: 'top',
  },
  counterContainer: {
    marginBottom: 18,
    marginTop: 18,
  },
  label: {
    fontSize: 16,
    fontFamily: "Jost_600SemiBold",
    color: '#333',
    marginBottom: 15,
    marginLeft:10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  addButton: {
    // flexDirection: "row",
    // alignItems: 'center',
    // justifyContent: "center",
    gap: 10,
    backgroundColor: "#F1C046",
    marginLeft: 140,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addRecipeButtonText: {
      color: 'white',
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
  },
  counterButton: {
    backgroundColor: '#e47a2e',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: 'white',
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#e47a2e',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
    textAlign: 'center',
  },

  recipe: {
    borderColor: '#ccc',
    backgroundColor: '#5daa80',
    padding: 10,

    marginBottom: 10,

  }, 
  recipeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,


  },
  
});

export default AddEventcreen;
