
### Migration run:
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm command


### Generate migrations
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n migration_file_name

### Run migrations
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run