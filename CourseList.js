import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';




const dataQuery = gql`
query allcourses {
  allcourses {
        id
        title
        author
        description
        topic
        url      
    }
  }
`;

export const CourseList = graphql(dataQuery)(props => {

  const { error, allcourses } = props.data;

  if (error) {
    return <Text>{error}</Text>;
  }
  if (allcourses) {
    return <View style={styles.container}>

      <FlatList
        data={allcourses}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.subitem}>{item.author}</Text>
            <Text style={styles.subitem}>Topic : {item.topic}</Text>
          </View>
        }
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>;
  }

  return <Text>Loading...</Text>;
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 14,
    height: 25,
  },
  subitem : {
    padding: 10,
    fontSize: 12,
    height: 25,
  }
})
