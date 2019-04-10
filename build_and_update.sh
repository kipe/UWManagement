#!/bin/sh

plasmapkg2 --type=kwinscript -r .
zip -r uwmanagement.kwinscript contents/ LICENSE metadata.desktop
plasmapkg2 --type=kwinscript -i .
