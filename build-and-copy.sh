#!/bin/bash

# Run npm build
npm run build

# Copy dist folder to backend root
cp -r dist ../backend
