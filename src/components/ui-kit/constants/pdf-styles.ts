export const PDF_STYLES = `
    @media print 
    {
        .pagebreak { page-break-before: always; } 
        .pagebreak-after { page-break-after: always; }
        .pagebreak-inside-avoid {
            page-break-inside: avoid; 
            page-break-before: auto;  
        }
    }
    .root{
        --color-primary: rgb(198, 48, 49);
    }
    .cv-preview__user-data {
        display: flex;
        height: 40px;
        align-items: flex-end;
        justify-content: space-between;
    }
    .cv-preview__button {
        display: none;
    }
    .title {
        margin-bottom: 8px; 
        margin-top: 16px; 
        font-size: 16px; 
        font-weight: bold;
        line-height: 1.5rem; 
    }
        .cv-preview__cv-description__right-side{
        border-left: 1px solid rgb(198, 48, 49);
        padding-left: 24px;
        padding-bottom: 16px;
    }
    .cv-preview__cv-description, .cv-preview__projects {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 260px auto;
    }
    .cv-preview__project-name {
        margin-bottom: 8px;
        margin-top: 16px;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        color: rgb(198, 48, 49);
    }
    .cv-preview__table-head {
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: rgb(198, 48, 49); 
        text-transform: uppercase;
    }
    .cv-preview__table-body-border {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: grey; 
    }
`
