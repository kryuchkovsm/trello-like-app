module.exports = {
  
  'users' : {
    'read'     : ['Read'],
    'add'      : ['Owner'],
    'delete'   : ['Owner']
  },
  
  'board' : {
    'read'     : ['Read'],
    'edit'     : ['Owner'],
    'delete'   : ['Owner']
  },

  'list' : {
    'read'     : ['Read'],
    'add'      : ['Owner', 'Write'],
    'edit'     : ['Owner', 'Write'],
    'delete'   : ['Owner']
  },
  
  'ticket' : {
    'read'     : ['Read'],
    'add'      : ['Owner', 'Write'],
    'edit'     : ['Owner', 'Write'],
    'delete'   : ['Owner']
  }

};