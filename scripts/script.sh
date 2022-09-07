#!/usr/bin/env bash

set -x;
gwas_summary=$1
outdir=$2
annotaion_type=$3 ##{CADD, GWAVA, DANN, GERP, EIGEN} # CADD Not included
bindir="/annovar" ## mount volume # folder with the annovar binaries
db="/db"  ## mount volume # humandb database

if [ ${annotaion_type} = 'CADD' ]; then
perl ${bindir}/annotate_variation.pl ${gwas_summary} ${db}/ -filter -dbtype cadd -buildver hg19 -out ${outdir}/annotation
fi

if [ ${annotaion_type} = 'GWAVA' ]; then
perl ${bindir}/annotate_variation.pl ${gwas_summary} ${db}/ -filter -dbtype gwava -buildver hg19 -out ${outdir}/annotation
fi

if [ ${annotaion_type} = 'DANN' ]; then
perl ${bindir}/annotate_variation.pl ${gwas_summary} ${db}/ -filter -dbtype dann -buildver hg19 -out ${outdir}/annotation
fi

if [ ${annotaion_type} = 'GERP' ]; then
perl ${bindir}/annotate_variation.pl ${gwas_summary} ${db}/ -filter -dbtype ljb23_gerp++  -buildver hg19 -out ${outdir}/annotation
fi

if [ ${annotaion_type} = 'EIGEN' ]; then
perl ${bindir}/annotate_variation.pl ${gwas_summary} ${db}/ -filter -dbtype eigen -buildver hg19 -out ${outdir}/annotation
fi

if [ -f ${outdir}/annotation*_filtered ]; then
    mv ${outdir}/annotation*_filtered ${outdir}/filtered.txt
else
   touch  ${outdir}/filtered.txt  
fi


if [ -f ${outdir}/annotation*_dropped ]; then
    mv ${outdir}/annotation*_dropped ${outdir}/dropped.txt
else
   touch  ${outdir}/dropped.txt  
fi

## databases, https://www.openbioinformatics.org/annovar/annovar_download.html

##input file format --- annovar input format

## test 
#./script.sh /media/yagoubali/bioinfo2/CADD/functionl_annotation.txt out_GWAVA  GWAVA 
#./script.sh /media/yagoubali/bioinfo2/CADD/functionl_annotation.txt out_EIGEN  EIGEN 
#./script.sh /media/yagoubali/bioinfo2/CADD/functionl_annotation.txt out_GERP  GERP 
#./script.sh /media/yagoubali/bioinfo2/CADD/functionl_annotation.txt out_CADD  CADD 
#./script.sh /media/yagoubali/bioinfo2/CADD/functionl_annotation.txt out_DANN DANN


