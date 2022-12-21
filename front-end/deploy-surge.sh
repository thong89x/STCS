#build react app
npm run build 

#move to folder build 
cd build

# Copy index.js -> 200.js
cp index.html 200.html

#deloy via Surge 
surge . Group8.surge.sh