## User Management

install moment.js

[link to site](http://momentjs.com/)

npm init -y
npm install moment --save

click on row id of user and use meteor toys session (currentUser) and it will update with that user's current info

## style our id's to be blue and have a point when hovered over

```scss
.user-id {
    color : $blue;
    cursor: pointer;
}
```

## add sass

```scss
.user-edit {
    position  : absolute;
    left      : -300px;
    top       : 0;
    background: #FFF;
    z-index   : 10;
    padding   : 20px;
    width     : 280px;
    opacity   : 0;
    transition: all 0.4s cubic-bezier(0.68, -0.65, 0.265, 1.20);
    @include card(2);

    .close-edit-mode {
        position      : absolute;
        top           : 0;
        right         : 0;
        font-size     : 1.2em;
        font-weight   : 900;
        text-transform: uppercase;
        cursor        : pointer;
    }
}

.edit-mode .user-edit {
    opacity: 1;
}
```

Users.html

```html
<template name="Users">
    {{#if isInRole 'admin'}}
      <h1 class="page-title">Players</h1>
      <table class="{{editMode}}">
        <tr>
          <th>Id </th>
          <th>Email</th>
          <th>First Name</th>
          <th>Created At</th>
          <th>Admin</th>
        </tr>
      {{#each users}}
        <tr>
          <td class="user-id">{{_id}}</td>
          <td>{{userEmail}}</td>
          <td>{{profile.firstName}}</td>
          <td>{{dateFormat}}</td>
          <td>{{isAdmin}}
            {{#if currentEdit}}
            <div class="user-edit">
              <i class="fa fa-close close-edit-mode"></i>
              <h3>Edit User</h3>
              {{#if isAdmin}}
                <button class="toggle-admin">Remove Admin</button>
              {{else}}
                <button class="toggle-admin">Make Admin</button>
              {{/if}}
            </div>
            {{/if}}
          </td>
        </tr>
      {{/each}}
      </table>
    {{else}}
      <h1>Not Authorized</h1>
    {{/if}}
</template>
```

Users.js

```js
import moment from 'moment';

Template.Users.onCreated(function() {
    this.autorun(() => {
      this.subscribe('allUsers');
    });
});

Template.Users.helpers({
  users: function() {
    return Meteor.users.find();
  },
  userEmail: function() {
    return this.emails[0].address;
  },
  isAdmin: function() {
    return Roles.userIsInRole(this._id, 'admin') ? 'admin' : '';
  },
  dateFormat: function() {
    return moment(this.createdAt).format('MMMM D YYYY');
  },
  editMode: function() {
    return Session.get('currentUser') ? 'edit-mode' : '';
  },
  currentEdit: function() {
    let user = Session.get('currentUser');
    return user._id === this._id;
  }
});

Template.Users.events({
  'click .user-id': function() {
    // console.log(this);
    Session.set('currentUser', this);
  },
  'click .toggle-admin': function() {
    Meteor.call('toggleAdmin', this._id);
  },
  'click .close-edit-mode': function() {
    Session.set('currentUser', null);
  }
});
```

