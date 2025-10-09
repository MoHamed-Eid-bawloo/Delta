import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
  delay?: number;
}

/**
 * TeamMemberCard Component
 * 
 * Team member card with:
 * - Avatar with placeholder initials
 * - Name and role
 * - Expandable modal with full bio
 * - Social/contact links
 */
export const TeamMemberCard = ({
  name,
  role,
  bio,
  image,
  linkedin,
  email,
  delay = 0
}: TeamMemberCardProps) => {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6 card-hover"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <Avatar className="w-24 h-24 border-2 border-primary/20">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium">{role}</p>
      </div>

      {/* Short Bio */}
      <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
        {bio}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle>{name}</DialogTitle>
                  <DialogDescription className="text-primary">
                    {role}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{bio}</p>
              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <a href={`mailto:${email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
