# Assignment 2c
## SyncUs: A Fast Dating Profile Viewer
### _By: Joshua Balsicas_

SyncUs allows users to quickly upload their own and view other dating profiles that feature only a person's name, age, email, and a sentence that best describes them or what they are looking for in a person. The option to showcase users your reasoning for participating in the SyncUs platform is also available (e.g. looking for a relationship, just looking for friends, etc).

- Link to live site: https://comp3033-assignment2c.onrender.com/ 
- Link to live site API: https://comp3033-assignment2c.onrender.com/api/syncs/
- Swagger Documentation page: https://comp3033-assignment2c.onrender.com/api-docs/

___SyncUS was once FrequentlyAPI but was changed due to lack of interactivity with the original API.___

### Data Design

Resource | Attributes | Description
-|-|-
Owner | firstName: String <br />email: String <br />age: Number <br />oneLiner: String <br />seeking: String | Owner represents the user of the SyncUs profile that can showcase their information

### API Goals Canvas

Who | What | How | Input | Output | Goal
-|-|-|-|-|-
User | View SyncUs profiles | Search for SyncUs profiles | Nothing | List of SyncUs dating profiles | Allow User to easily parse through SyncUs profiles that are posted by authenticated users
Admin (authenticated user) | Manage SyncUs profiles | Add new SyncUs profile | SyncUs profile info | New SyncUs profile info | Allows Admin to add a new profile in the overall SyncUs profile pool
&ndash; | &ndash; | Update SyncUs profiles | SyncUs profile info | New SyncUs profile info | Allows Admin to edit existing SyncUs profiles that were added to the database
&ndash; | &ndash; | Delete SyncUs profiles | SyncUs profile id | Nothing | Allows Admin to delete existing SyncUs profiles that were added to the database 

### Endpoints Table

Endpoint | Parameters | Method | Description
-|-|-|-
/syncs | None | GET | Returns a list of SyncUs profiles
/syncs | ?age="" | GET | Returns a list of SyncUs profiles filtered by profile age
/syncs | SyncUs profile info as JSON | POST | Adds a new SyncUs profile
/syncs/:_id | _id: SyncUs profile id to be updated | PUT | Edits an existing SyncUs profile
/syncs/:_id | _id: SyncUs profile id to be deleted | DELETE | Deletes an existing SyncUs profile
