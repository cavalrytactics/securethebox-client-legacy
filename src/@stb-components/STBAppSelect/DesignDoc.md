# STBAppSelect

- props:
    - [appList] : Array of objects
        - {
            'id':'0', 
            'urlImage':'http://...'
            'selected': false
          }

- A material-ui 'grid' component that presents app helm charts
- A material-ui 'switch' component that enables an app
- Enabling an app will populate the Vis-Network Diagram component
- User is able to 'edit' the app
    - This opens a Monaco Editor to edit the 'yaml' file for the helm chart
