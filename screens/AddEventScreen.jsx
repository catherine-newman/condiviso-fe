import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { UserContext } from '../contexts/User';
import { postEvent } from '../utils/api';

const AddEventScreen = () => {
  const { user } = useContext(UserContext);
  const [numOfGuests, setNumOfGuests] = useState(1);

  const initialValues = {
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
    recipes: [
      {
        _id:'',
        user_id: 'user.user_id',
        recipe_name: '',
        recipe_ingredients: '',
        recipe_content: '',
        recipe_image: ''
   } ]}
 
  // const handleAutofill = (autofillValue) => {
  //   autofillValue('event_location', user.address);
  // };

  const handleSubmit = (values) => {
    postEvent(values, user)
      .then((postedEvent) => {
        console.log(postedEvent);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values, autofillValue }) => (
        <SafeAreaView style={styles.container}>
             <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <ScrollView style={styles.scrollView}>
       
              {/* <TouchableOpacity style={styles.autofillButton} onPress={() => handleAutofill(autofillValue)}>
                <Text style={styles.autofillButtonText}>Autofill my user details</Text>
              </TouchableOpacity> */}
               <View style={styles.eventHeader}>
<Text style={styles.header}>create event</Text>
</View>

<View style={styles.eventContainer}>
<View style={styles.event}>
              <TextInput
                style={styles.input}
                maxLength={60}
                placeholder="Event Name"
                value={values.event_name}
                onChangeText={handleChange('event_name')}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Event date (DD-MM-YYY)"
                value={values.event_date}
                onChangeText={handleChange('event_date')}
                keyboardType="numeric"
              />
               {/* <TextInput
                style={styles.input}
                placeholder="Event location"
                value={values.event_location}
                onChangeText={handleChange('event_location')}
              /> */}

              <TextInput
                style={styles.input}
                placeholder="Event City"
                value={values.event_city}
                onChangeText={handleChange('event_city')}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Event description"
                value={values.event_description}
                onChangeText={handleChange('event_description')}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Event duration (e.g. 4 hours)"
                value={values.event_duration}
                onChangeText={handleChange('event_duration')}
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
              </View>
           
              {values.recipes.map((recipe, index) => (
                        <View key={index}style={styles.recipe}>
                           <View style={styles.recipeContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Recipe Name`}
                value={recipe.recipe_name}
                onChangeText={(text) => handleChange(`recipes[${index}].recipe_name`)(text)}
              />
               <TextInput
                style={styles.input}
                placeholder={`Recipe Ingredients`}
                value={recipe.recipe_ingredients}
                onChangeText={(text) => handleChange(`recipes[${index}].recipe_ingredients`)(text)}
              />
               <TextInput
                style={styles.input}
                placeholder={`Recipe Content`}
                value={recipe.recipe_content}
                onChangeText={(text) => handleChange(`recipes[${index}].recipe_content`)(text)}
              />
               <TextInput
                style={styles.input}
                placeholder={`Recipe image`}
                value={recipe.recipe_image}
                onChangeText={(text) => handleChange(`recipes[${index}].recipe_image`)(text)}
              />
            
                      <TouchableOpacity
                 style={styles.addButton}
                 
                 onPress={() => {
                   
                   handleChange(`recipes[${index}]`)(values.recipes.concat({ recipe_name: '', recipe_ingredients: '', recipe_content: '', recipe_ingredients_content: '', recipe_image: ''}));
                   <Text style={styles.addRecipeButtonText}>Add another recipe</Text>
                  }}
                 ></TouchableOpacity>
           
            </View>
          </View>
          ))}
              
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Post Event</Text>
              </TouchableOpacity>
              
          
      
          </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    

    
  },
  eventContainer: {
    borderColor: '#e47a2e',
      padding:10, 
      

  },
  event: {

   padding: 10
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

  // autofillButton: {
  //   backgroundColor: '#e47a2e',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   alignSelf: 'flex-start',
  // },
  // autofillButtonText: {
  //   color: 'white',
  //   fontFamily: "Jost_600SemiBold",
  //   fontSize: 16,
  // },
  input: {

    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding:20,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: "Jost_600SemiBold",
     
  },
  textArea: {
     
    height: 100,
    textAlignVertical: 'top',
  },
  counterContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "Jost_600SemiBold",
    color: '#333',
    marginBottom: 8,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  addButton: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F1C046",
    marginLeft: 65,
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


  }, 
  recipeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,


  },
  
});

export default AddEventScreen;
