let mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment')

let data = [
	{
		name: 'Yosemite',
		image:
			'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer magna leo, rutrum ut blandit mollis, aliquet non arcu. Curabitur sollicitudin justo libero, sit amet ullamcorper mauris commodo sit amet. Maecenas nec viverra erat. Suspendisse vestibulum nunc nulla, et vulputate ligula egestas nec. Sed rutrum convallis elit, vitae ornare purus faucibus non. Aenean pellentesque eleifend lorem, eget sagittis ex hendrerit a. Sed quis lorem nec eros blandit rutrum sed vel tortor. Proin vestibulum vitae nunc sed tincidunt. In aliquet placerat consequat.',
	},
	{
		name: 'Creekside',
		image:
			'https://q9m3bv0lkc15twiiq99aa1cy-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/TENT.jpeg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut sem id sapien interdum ultrices. Cras quis tortor quam. Aliquam imperdiet lacus nibh, eu vehicula sapien condimentum condimentum. Curabitur nisl augue, pharetra in molestie sit amet, ultricies at erat. In pulvinar hendrerit dignissim. Nulla commodo, lectus non vulputate commodo, quam quam molestie nisl, laoreet imperdiet erat libero quis sapien. Donec vel ullamcorper risus. In hac habitasse platea dictumst.',
	},
	{
		name: 'Beachfront',
		image: 'https://www.gore-tex.com/sites/default/files/blog_images/beach-camping.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur tristique lacus non facilisis. Nunc urna leo, ornare cursus nisl sit amet, commodo maximus risus. Pellentesque a massa faucibus, porttitor risus in, blandit odio. Phasellus accumsan ut enim eu rhoncus. Vivamus a sagittis augue, vitae faucibus elit. Nam ultricies lorem ac fermentum blandit. Morbi tincidunt risus quis lectus eleifend, nec pretium neque eleifend. Maecenas sed imperdiet lectus. Nullam eget nibh ac tortor auctor aliquet. Nulla neque dui, accumsan quis massa ut, aliquam finibus lorem.',
	},
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "Lorem ipsum dolor sit amet.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}
 
module.exports = seedDB;