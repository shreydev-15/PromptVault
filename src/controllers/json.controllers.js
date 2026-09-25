const promptSchema = require('../models/prompts.models')

async function jsonDownload (req, res){
    const prompt = await promptSchema.findById(req.params.id);
    if(!prompt){
        return res.status(400).json({
            message: "Prompt not found"
        })
    }

    const fileContent = JSON.stringify({
      title: prompt.title,
      content: prompt.content,
      description: prompt.description,
      tags: prompt.tags,
      isPublic: prompt.isPublic,
      createdBy: prompt.createdBy
    }, null, 2);        
    
    res.setHeader('Content-Disposition', `attachment; filename="${prompt.title}.json"`);
    res.setHeader('Content-Type', 'application/json');

    return res.send(fileContent);
      
}

module.exports = {jsonDownload}