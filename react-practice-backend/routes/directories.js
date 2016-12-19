var express = require('express')
  , _ = require('lodash')
  , router = express.Router()
  , store = require('./../store/store')
  , idGenerator = require('./../store/id-generator')

router
  .get('/', function (req, res) {
    res.send(store.directories)
  })
  .post('/', function (req, res) {
    var directory = _.pick(req.body, [
          'parentId',
          'name',
          'isVisible',
          'isOpened'
        ]
      )
      , parent = _.find(store.directories, function (dir) {
        return dir.id == directory.parentId
      })

    if (parent) {
      _.assign(directory, { id: idGenerator.getNext() })
      store.directories.push(directory)

      res.send(directory)
    } else {
      res.status(500).send('no parent')
    }
  })
  .put('/:id', function (req, res) {
    var directory = _.pick(req.body, [
          'id',
          'parentId',
          'name',
          'isVisible',
          'isOpened'
        ]
      )
      , oldEntityIndex = _.findIndex(store.directories, function (dir) {
        return dir.id == req.params.id
      })

    if (oldEntityIndex !== -1) {
      store.directories.splice(oldEntityIndex, 1, directory)
      res.send(directory)
    } else {
      res.status(500).send('no entity')
    }
  })
  .delete('/:id', function (req, res) {
    var directoryId = req.params.id

    if (directoryId == 1) {
      res.send(500).send('can not remove root directory')
      return
    }

    var entityIndex = _.findIndex(store.directories, function (dir) {
        return dir.id == directoryId
      })
      , directory = store.directories[entityIndex]

    if (entityIndex !== -1) {
      function removeDescendants(array, parentId) {
        let childrenIds = [];
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i].parentId === parentId) {
              childrenIds.push(array[i].id);
              array.splice(i, 1);
            }
        }
        childrenIds.forEach((n) => removeDescendants(array, n));
        return array;
      }
      store.directories = removeDescendants(store.directories, directory.id);
      _.remove(store.directories, (n) => n.id === directory.id);
      _.remove(store.notices, (n) => store.directories.filter((obj) => obj.id === n.directoryId).length === 0);
      res.send(store.directories);
    } else {
      res.status(500).send('no entity')
    }
  })

module.exports = router
