import { ScrollView } from "react-native-gesture-handler";
import { useEffect ,useContext} from "react";
import { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { getSingleUser } from "../utils/api"
import { postUser } from "../utils/api"
import { UserContext } from "../contexts/User";

const SignUpScreen = ({ navigation }) => {
    const [signUpClicked, setSignUpClicked] = useState(false)

    const [newUsername, setNewUsername] = useState("")
    const [newFirstname, setNewFirstname] = useState("")
    const [newLastname, setNewLastname] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newAddress, setNewAddress] = useState("")
    const [newPostcode, setNewPostcode] = useState("")
    const [newAboutMe, setNewAboutMe] = useState("")

    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showSignUpInput , setShowSignUpInput] = useState(false);
    const [username, setUsername] = useState("");
    const [enteredUsername, setEnteredUsername] = useState("");
    const { setUser , user} =useContext(UserContext)
console.log(user)
    const handleEnterButtonPress = () => {
        setUsername(enteredUsername)
    }

    useEffect(() => {
        if(username.length > 0){
       getSingleUser(username)
       .then((data)=>{
        setUser(data)
        })
        .catch((err)=>{
            console.log(err);
        })}
    }, [username]);

    useEffect(()=>{
        if(signUpClicked === true){
            // console.log(newUsername,newFirstname,newLastname,newEmail,newAddress,newPostcode,newAboutMe)
       postUser(newUsername,newFirstname,newLastname,newEmail,newAddress,newPostcode,newAboutMe)
       .then((data)=>{
        console.log(data);

        setSignUpClicked(false)
        }) 
       .catch((err)=>{
        console.log(err)
       })}
    },[signUpClicked])

    const handleCancel = () =>{
        setShowUsernameInput(false);
        setUsername("");
    };

    const toggleUsernameInput = () =>{
        showUsernameInput ? setShowUsernameInput(false) : setShowUsernameInput(true)
    }

    const toggleSignInInput = () =>{
        showSignUpInput ? setShowSignUpInput(false) : setShowSignUpInput(true);
    }

    const handleSignUpSubmit =()=>{
        setSignUpClicked(true);
    }

    const handleCancelSignUp = ()=>{
        setShowSignUpInput(false)
    }

    return (
    <ScrollView>
    <View style={styles.container}>
        
        <Text style = {styles.title}>Log-In or Sign-Up</Text>

        {!showSignUpInput && (
        <TouchableOpacity onPress = {toggleUsernameInput}>
            <Text style ={styles.loginButton}>Log-In</Text>
        </TouchableOpacity>
        )}

        {showUsernameInput && (
            <View>
            <View>
                <TextInput
                placeholder = "Enter Username"
                value = {enteredUsername}
                onChangeText={setEnteredUsername}
                />
                <TextInput placeholder = "Enter Password"/>
            
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                onPress = {handleEnterButtonPress}
                >
                    <Text style = {styles.buttonText}>Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress = {handleCancel}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            
         </View>
</View>
                
        )}
               {!showUsernameInput && !showSignUpInput && (
            <Text style={styles.orText}>Or</Text>
            )}

            {!showUsernameInput &&(
            <TouchableOpacity onPress = {toggleSignInInput}>
                <Text style = {styles.signupButton}>Sign-Up</Text>
                </TouchableOpacity>
    )}
            {showSignUpInput &&(
               <View>
                <Text style = {styles.signupLabel}>Please enter your details</Text>
                <TextInput placeholder = "Username" onChangeText={setNewUsername} value = {newUsername} style = {styles.input}/> 
                <TextInput placeholder = "First name" onChangeText={setNewFirstname}value = {newFirstname} style = {styles.input}/>
                <TextInput placeholder = "Last name" onChangeText = {setNewLastname}value = {newLastname} style = {styles.input}/>
                <TextInput placeholder = "Email" onChangeText = {setNewEmail} value = {newEmail} style = {styles.input}/>
                <TextInput placeholder = "Address" onChangeText = {setNewAddress} value = {newAddress} style = {styles.input}/>
                <TextInput placeholder = "Postcode" onChangeText = {setNewPostcode} value = {newPostcode} style = {styles.input}/>
                <TextInput placeholder = "About me" onChangeText = {setNewAboutMe} value = {newAboutMe} style = {styles.input}/>
                
                <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignUpSubmit}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelSignUp}>
                    <Text style = {styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
                </View>
            )}

    </View>
    </ScrollView>
    );
};


  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    loginButton: {
      fontSize: 18,
      marginBottom: 20,
      color: "#00adf5",
    },
    input: {
      width: "80%",
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      width: "48%",
      alignItems: "center",
    },
    buttonText: {
      fontWeight: "bold",
    },
    enterButton: {
      backgroundColor: "#00adf5",
    },
    enterButtonText: {
      color: "white",
    },
    cancelButton: {
      backgroundColor: "#f44336",
    },
    cancelButtonText: {
      color: "white",
    },
    orText: {
      fontSize: 16,
      marginVertical: 10,
    },
    signupButton: {
      fontSize: 18,
      marginTop: 20,
      color: "#00adf5",
    },
    signupLabel: {
      fontSize: 16,
      marginBottom: 10,
    },
    // submitButton: {
    //   backgroundColor: "#4caf50",
    // },
    submitButtonText: {
      color: "white",
    },

    orContainer: {
        alignItems: "center",
        marginVertical: 20,
      },
      orText: {
        fontFamily: "Jost_400Regular",
        fontSize: 18,
        color: "#5daa80",
      },
    
      signUpContainer: {

      },
      signUpTitle: {
        fontFamily: "Jost_400Regular",
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 20,
      },
      signUpButtonText: {
        fontFamily: "Jost_400Regular",
        fontSize: 18,
        color: "#5daa80", 
        textAlign: "center",
        marginBottom: 10,
      },
      submitButton: {
        backgroundColor: "#5daa80",
        padding: 10,
        borderRadius: 5,
        width: "60%",
        marginBottom: 10,
      },
      cancelButton: {
        backgroundColor: "#e74c3c", 
        padding: 10,
        borderRadius: 5,
        width: "60%",
        marginBottom: 20,
      },
    });
  


export default SignUpScreen;