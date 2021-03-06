import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, Text, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';

import HeaderButton from '../components/HeaderButton';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MaterialTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

import { setAvailableDeviceWidth } from '../store/actions/screen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
        height: Platform.OS === 'android' ? 100 : 50,
    },
    headerTitleStyle: {
        fontFamily: 'poppins-b',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'poppins'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const Meals = ({navigation}) => {

    return (
        <Stack.Navigator
            initialRouteName="Categories"
            headerMode="screen"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="Categories" 
                component={CategoriesScreen} 
                options={({ route }) => ({ 
                    title: 'Catégories',
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Stack.Screen 
                name="CategoryMeals" 
                component={CategoryMealsScreen} 
            />
            <Stack.Screen 
                name="MealDetail" 
                component={MealDetailScreen} 
                options={({ route }) => ({ 
                    headerRight: (props) => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='Favorite' 
                                iconName={
                                    (route.params?.isFav) ? 'ios-star' : 'ios-star-outline'
                                    } 
                                onPress={route.params?.toggleFav}
                            />
                        </HeaderButtons>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const FavNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            headerMode="screen"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="Favorites" 
                component={FavoritesScreen} 
                options={({ route }) => ({ 
                    title: 'Recettes préférées',
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Stack.Screen 
                name="MealDetail" 
                component={MealDetailScreen} 
                options={({ route }) => ({ 
                    headerRight: (props) => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='Favorite' 
                                iconName={
                                    (route.params?.isFav) ? 'ios-star' : 'ios-star-outline'
                                    } 
                                onPress={route.params?.toggleFav}
                            />
                        </HeaderButtons>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const MealsFavTabNavigator = () => {
    if (Platform.OS === 'android') {
        return (
            <MaterialTab.Navigator
                activeColor="white"
                shifting   
            >
                <MaterialTab.Screen 
                    name="Meals" 
                    component={Meals}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return <Ionicons 
                                name='ios-restaurant' 
                                size={25} 
                                color={tabInfo.color}
                            />;
                        },
                        tabBarColor: Colors.primaryColor,
                        tabBarLabel: <Text style={{fontFamily: 'poppins'}}>Recettes</Text>
                    }}
                />
                <MaterialTab.Screen 
                    name="Favorites" 
                    component={FavNavigator}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return <Ionicons 
                                name='ios-star' 
                                size={25} 
                                color={tabInfo.color}
                            />;
                        },
                        tabBarColor: Colors.accentColor,
                        tabBarLabel: <Text style={{fontFamily: 'poppins'}}>Favoris</Text>
                    }}
                />
            </MaterialTab.Navigator>
        );
    } else {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: Colors.accentColor,
                    labelStyle: {
                        fontFamily: 'poppins'
                    }
                }}
            >
                <Tab.Screen 
                    name="Recettes" 
                    component={Meals}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return <Ionicons 
                                name='ios-restaurant' 
                                size={25} 
                                color={tabInfo.color}
                            />;
                        }
                    }}
                />
                <Tab.Screen 
                    name="Favoris" 
                    component={FavNavigator}
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return <Ionicons 
                                name='ios-star' 
                                size={25} 
                                color={tabInfo.color}
                            />;
                        }
                    }}
                />
            </Tab.Navigator>
        );
    };
};

const FiltersNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Filters"
            headerMode="screen"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="Filters" 
                component={FiltersScreen}
                options={({ route }) => ({ 
                    title: 'Filtrer les recettes',
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Save" 
                                iconName="ios-save"
                                onPress={route.params?.save}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const AddRecipeNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="AddRecipe"
            headerMode="screen"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="AddRecipe" 
                component={AddRecipeScreen}
                options={({ route }) => ({ 
                    title: 'Nouvelle recette',
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    let availableDeviceWidth = useSelector(state => state.screen.availableDeviceWidth);
    const dispatch = useDispatch();

    useEffect(() => {
      Dimensions.addEventListener('change', updateLayout);
      return () => {
          Dimensions.removeEventListener('change', updateLayout);
      };
    });

    const updateLayout = () => {
        const newWidth = Dimensions.get('window').width;
        dispatch(setAvailableDeviceWidth(newWidth));
        availableDeviceWidth = newWidth;
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: Colors.accentColor,
                    labelStyle: {
                        fontFamily: 'poppins'
                    }
                }}>
                <Drawer.Screen 
                    name="MealsFavs" 
                    component={MealsFavTabNavigator} 
                    options={() => ({drawerLabel: 'Recettes'})}
                />
                <Drawer.Screen 
                    name="Filtres" 
                    component={FiltersNavigator} 
                />
                <Drawer.Screen 
                    name="Ajouter une recette" 
                    component={AddRecipeNavigator} 
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;